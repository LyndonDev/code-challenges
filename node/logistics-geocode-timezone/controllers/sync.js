const axios = require('axios');
const parse = require('csv-parse');
const _ = require('lodash');

const shipments = require('../models/shipments');

const syncShipmentData = () => {
  return getShipmentData()
    .then(csvString => {
      return parseShipmentData(csvString);
    })
    .then(shipmentData => {
      return getGeolocations(shipmentData);
    })
    .then(shipmentData => {
      return getTimezones(shipmentData);
    })
    .then(shipmentData => {
      return writeShipmentData(shipmentData);
    })
    .catch(err => {
      throw { statusCode: 500, details: err };
    });
};

const getShipmentData = () => {
  return new Promise((resolve, reject) => {
    const dataURL = ''; // Insert CompanyXYZ data api
    axios.get(dataURL)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject({ statusCode: 500, details: err });
      });
  });
};

const parseShipmentData = (csvString) => {
  return new Promise((resolve, reject) => {
    parse(csvString, {}, (err, output) => {
      if (err) {
        return reject({ statusCode: 500, details: err });
      }

      const shipmentData = [];
      const columnHeaders = output[0];

      output.forEach(row => {
        let shipment = {};

        for (let i = 0; i < columnHeaders.length; i++) {
          shipment.id = row[0].trim();
          shipment.clientName = row[1].trim();
          shipment.origin = {
            address: row[2].trim()
          };
          shipment.destination = {
            address: row[3].trim()
          };
          shipment.mode = row[4].trim();
          shipment.estDeparture = row[5].trim();
          shipment.estArrival = row[6].trim();
          shipment.status = row[7].trim();
        }

        shipmentData.push(shipment);
      });

      shipmentData.shift();

      return resolve(shipmentData);
    });
  });
};

const getGeolocations = (shipmentData) => {
  return new Promise((resolve, reject) => {
    // Create an array of unique addresses to minimize api calls
    let uniqueAddresses = _.concat(
      _.uniq(shipmentData.map(shipment =>
        shipment.origin.address.toLowerCase())),
      _.uniq(shipmentData.map(shipment =>
        shipment.destination.address.toLowerCase()))
    );

    uniqueAddresses = _.uniq(uniqueAddresses);

    const geoPromises = [];

    uniqueAddresses.forEach(address => {
      const params = [
        `address=${ encodeURI(address) }`,
        'inputtype=textquery',
        'fields=geometry',
        `key=${ process.env.GOOGLE_MAPS_API_KEY }`,
      ];
      const apiURL =
        `https://maps.googleapis.com/maps/api/geocode/json?${ params.join('&') }`;
      const geoPromise = axios.get(apiURL)
        .then(res => res.data)
        .catch(err => {
          return { statusCode: 500, details: err };
        });

      geoPromises.push(geoPromise);
    });

    Promise.all(geoPromises)
      .then(results => {
        // Build an object of address/geo data for lookup purposes
        let addressGeos = {};
        for (let i = 0; i < results.length; i++) {
          const uniqueAddress = uniqueAddresses[i];

          // Geolocation may return more than 1 result per location, use the first one
          addressGeos[uniqueAddress] = {
            lat: results[i].results[0].geometry.location.lat,
            lng: results[i].results[0].geometry.location.lng
          };
        }

        // Insert geolocation data into shipmentData
        shipmentData.forEach(shipment => {
          shipment.origin.location =
            addressGeos[shipment.origin.address.toLowerCase()];
          shipment.destination.location =
            addressGeos[shipment.destination.address.toLowerCase()];
        });

        return resolve(shipmentData, addressGeos);
      })
      .catch(err => {
        return reject({ statusCode: 500, details: err });
      });
  });
};

const getTimezones = (shipmentData) => {
  return new Promise((resolve, reject) => {
    // Same as above, but with geolocations!
    let uniquePlaces = _.concat(
      _.uniq(shipmentData.map(shipment => {
        return {
          address: shipment.origin.address.toLowerCase(),
          location: {
            lat: shipment.origin.location.lat,
            lng: shipment.origin.location.lng
          }
        };
      })),
      _.uniq(shipmentData.map(shipment => {
        return {
          address: shipment.destination.address.toLowerCase(),
          location: {
            lat: shipment.destination.location.lat,
            lng: shipment.destination.location.lng
          }
        };
      }))
    );

    uniquePlaces = _.uniq(uniquePlaces);

    const timezonePromises = [];

    uniquePlaces.forEach(place => {
      const params = [
        `location=${ place.location.lat },${ place.location.lng }`,
        'timestamp=1458000000',
        `key=${ process.env.GOOGLE_MAPS_API_KEY }`,
      ];
      const apiURL =
        `https://maps.googleapis.com/maps/api/timezone/json?${ params.join('&') }`;
      const timezonePromise = axios.get(apiURL)
        .then(res => res)
        .catch(err => {
          return { statusCode: 500, details: err };
        });

      timezonePromises.push(timezonePromise);
    });

    Promise.all(timezonePromises)
      .then(results => {
        // Build an object of address/timezone data for lookup purposes
        let addressTimezones = {};

        for (let i = 0; i < results.length; i++) {
          const uniqueAddress = uniquePlaces[i].address;

          addressTimezones[uniqueAddress] = {
            dstOffset: results[i].data.dstOffset,
            rawOffset: results[i].data.rawOffset,
            id: results[i].data.timeZoneId,
            name: results[i].data.timeZoneName
          };
        }

        // Insert data data into shipmentData
        shipmentData.forEach(shipment => {
          shipment.origin.timeZone =
            addressTimezones[shipment.origin.address.toLowerCase()];
          shipment.destination.timeZone =
            addressTimezones[shipment.destination.address.toLowerCase()];
        });

        return resolve(shipmentData);
      })
      .catch(err => {
        return reject({ statusCode: 500, details: err });
      });
  });
};

const writeShipmentData = (shipmentData) => {
  return shipments.insertBatch(shipmentData)
    .then(writeResults => {
      return `Inserted ${ writeResults.length } shipping records.`;
    })
    .catch(err => {
      return { statusCode: 500, details: err };
    });
};

module.exports = {
  syncShipmentData
};
