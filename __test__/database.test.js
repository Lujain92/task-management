import { mongoConnect, getDb } from '../util/database.js'
import { MongoClient } from 'mongodb';

describe('MongoDB Connection', () => {

  const mockClient = {
    db: jest.fn(),
  };

  jest.spyOn(MongoClient, 'connect').mockResolvedValue(mockClient);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('mongoConnect function', () => {
    
    it('should establish a MongoDB connection', async () => {

      await mongoConnect();

      expect(MongoClient.connect).toHaveBeenCalled();
      expect(mockClient.db).toHaveBeenCalled();
    });

    it('should throw an error if the MongoDB connection fails', async () => {

      const errorMessage = 'Connection failed';
      MongoClient.connect.mockRejectedValueOnce(new Error(errorMessage));

    });

  });

  describe('getDb function', () => {

    it('should throw an error if no database instance is found', () => {
      
      expect(getDb).toThrow('No database found!');
    });
  });

});
