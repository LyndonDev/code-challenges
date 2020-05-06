# Company XYZ Code Challenge

Although it was a frontend challenge to create an interface that displays useful information, I wrote a quick Express app to download the sample data, retrieve time zone information for locations listed in the file, and write the data into a database for the frontend ui to consume.

The frontend interface is located in `../../vue/logistics-table`

## To Run Locally

This project uses Node.js and Firebase.

1. Assuming you have Node.js already installed, you may also have to install the [Firebase CLI](https://firebase.google.com/docs/cli)
3. Checkout this repository
4. `npm install`
5. Create an `.env` file in the project root, with key `GOOGLE_MAPS_API_KEY` set to your Google Maps API key
6. `firebase emulators:start`
