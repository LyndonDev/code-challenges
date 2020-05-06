const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const shipmentsCollection = db.collection('shipments');

const insertBatch = (shipmentData) => {
  let batch = db.batch();

  shipmentData.forEach(shipment => {
    let shipmentRef = shipmentsCollection.doc(shipment.id);

    batch.set(shipmentRef, shipment);
  });

  return batch.commit()
    .then(writeResults => writeResults)
    .catch(err => err);
};

module.exports = {
  insertBatch
};
