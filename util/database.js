require('dotenv').config();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

/**
 * Establishes a connection to a MongoDB database using the provided MONGO_URL.
 * @param {Function} callback - A callback function to be executed upon successful connection.
 * @throws {Error} Throws an error if the connection to the database fails.
 */
const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGO_URL)
    .then((client) => {
      console.log('Connected!');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

/**
 * Retrieves the active MongoDB database instance.
 * @returns {Db} The active MongoDB database instance.
 * @throws {String} Throws an error if no database instance is found.
 */
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

module.exports = { mongoConnect, getDb };

