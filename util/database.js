import { MongoClient } from 'mongodb';
import configurationService from './data/ configuration-service.js';

let _db;

/**
 * Establishes a connection to a MongoDB database using the provided MONGO_URL.
 * @throws {Error} Throws an error if the connection to the database fails.
 */
const mongoConnect = async () => {
    try {
        const client = await MongoClient.connect(
            configurationService.MONGODB_URL,
        );
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

/**
 * Retrieves a collection from the database.
 * @param {string} name - The name of the collection to retrieve.
 * @returns {Collection} The database collection.
 * @throws {string} Throws an error if no database is found.
 */
const getCollection = (name) => {
    if (_db) {
        console.log(_db,"rr")
        return _db.collection(name);
    }
    throw 'No database found!';
};

export { getCollection, getDb, mongoConnect };
