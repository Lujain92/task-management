import { MongoClient } from 'mongodb';

let _db;

/**
 * Establishes a connection to a MongoDB database using the provided MONGO_URL.
 * @throws {Error} Throws an error if the connection to the database fails.
 */
const mongoConnect = async () => {
  try {
    const client = await MongoClient.connect('mongodb+srv://user:0000@cluster0.4qaxvnn.mongodb.net/list?retryWrites=true&w=majority');
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

const test = async (updatedTask) => {
  return await _db.collection('task').updateOne({ _id: updatedTask._id }, { $set: updatedTask });
}

export  { mongoConnect, getDb , test};

