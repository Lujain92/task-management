import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();
let _db;

/**
 * Establishes a connection to a MongoDB database using the provided MONGO_URL.
 * @throws {Error} Throws an error if the connection to the database fails.
 */
const mongoConnect = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB!');
    _db = client.db();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
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

export  { mongoConnect, getDb };

