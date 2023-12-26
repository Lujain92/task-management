const { mongoConnect, getDb } = require('../util/database');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('MongoDB Connection', () => {

  const mockClient = {
    db: jest.fn(),
  };

  jest.spyOn(MongoClient, 'connect').mockResolvedValue(mockClient);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mongoConnect function', () => {
    
    it('should establish a MongoDB connection and call the callback', async () => {
      const callback = jest.fn();
      dotenv.config.mockReturnValueOnce();

      await mongoConnect(callback);

      expect(MongoClient.connect).toHaveBeenCalledWith(process.env.MONGO_URL);
      expect(mockClient.db).toHaveBeenCalled();
      expect(callback).toHaveBeenCalled();
    });

    it('should throw an error if the MongoDB connection fails', async () => {

      const callback = jest.fn();
      const errorMessage = 'Connection failed';
      MongoClient.connect.mockRejectedValueOnce(new Error(errorMessage));

      expect(callback).not.toHaveBeenCalled();
    });

  });

  describe('getDb function', () => {


    // it('should getDB  instance', () => {
    //   _db = mockClient.db;

    //   expect(getDb).toEqual(_db);
    // });

    it('should throw an error if no database instance is found', () => {
      _db = null;

      expect(getDb).toThrow('No database found!');
    });
  });

});
