const { getDb } = require('../../util/database');
const Task = require('../../models/task');

jest.mock('../../util/database', () => ({
  getDb: jest.fn(),
}));

jest.mock('mongodb', () => ({
  ObjectId: jest.fn().mockImplementation((id) => ({ $oid: id })),
}));

describe('Task', () => {
  describe('save()', () => {

    it('should insert a new task', async () => {
      const insertOneMock = jest.fn().mockResolvedValue({ insertedCount: 1 });
      const collectionMock = jest.fn().mockReturnValue({ insertOne: insertOneMock });
      getDb.mockReturnValue({ collection: collectionMock });

      const newTask = new Task({
        title: 'New Task',
        description: 'New Description',
      });

      await newTask.save();

      expect(getDb).toHaveBeenCalled();
      expect(collectionMock).toHaveBeenCalledWith('task');
      expect(insertOneMock).toHaveBeenCalledWith(newTask);
    });

  });

  describe('fetchAll()', () => {

    it('should fetch all tasks from the database', async () => {
      const mockTasks = [
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
      ];
      const toArrayMock = jest.fn().mockResolvedValue(mockTasks);
      const findMock = jest.fn().mockReturnValue({ toArray: toArrayMock });
      const collectionMock = jest.fn().mockReturnValue({ find: findMock });
      getDb.mockReturnValue({ collection: collectionMock });

      const tasks = await Task.fetchAll();

      expect(tasks).toEqual(mockTasks);
      expect(getDb).toHaveBeenCalled();
      expect(collectionMock).toHaveBeenCalledWith('task');
      expect(findMock).toHaveBeenCalled();
      expect(toArrayMock).toHaveBeenCalled();
    });

    it('should handle errors from the database', async () => {
      const dbError = new Error('Database error');
      const toArrayMock = jest.fn().mockRejectedValue(dbError);
      const findMock = jest.fn().mockReturnValue({ toArray: toArrayMock });
      const collectionMock = jest.fn().mockReturnValue({ find: findMock });
      getDb.mockReturnValue({ collection: collectionMock });

      const tasks = await Task.fetchAll();

      expect(tasks).toBeUndefined();
      expect(getDb).toHaveBeenCalled();
      expect(collectionMock).toHaveBeenCalledWith('task');
      expect(findMock).toHaveBeenCalled();
      expect(toArrayMock).toHaveBeenCalled();
    });

  });

  describe('findById()', () => {

    it('should find a task by ID', async () => {
      const mockTask = { _id: 'someId', title: 'Task 1' };
      const findMock = jest.fn().mockReturnValue({ next: jest.fn().mockResolvedValue(mockTask) });
      const collectionMock = jest.fn().mockReturnValue({ find: findMock });
      getDb.mockReturnValue({ collection: collectionMock });

      const foundTask = await Task.findById('someId');

      expect(foundTask).toEqual(mockTask);
      expect(getDb).toHaveBeenCalled();
      expect(collectionMock).toHaveBeenCalledWith('task');
      expect(findMock).toHaveBeenCalledWith({ _id: { $oid: 'someId' } });
    });

    it('should handle task not found', async () => {
      const findMock = jest.fn().mockReturnValue({ next: jest.fn().mockResolvedValue(null) });
      const collectionMock = jest.fn().mockReturnValue({ find: findMock });
      getDb.mockReturnValue({ collection: collectionMock });

      const foundTask = await Task.findById('nonExistentId');

      expect(foundTask).toBeNull();
      expect(getDb).toHaveBeenCalled();
      expect(collectionMock).toHaveBeenCalledWith('task');
      expect(findMock).toHaveBeenCalledWith({ _id: expect.any(Object) });
    });

    it('should handle errors from the database', async () => {
      const dbError = new Error('Database error');
      const findMock = jest.fn().mockReturnValue({ next: jest.fn().mockRejectedValue(dbError) });
      const collectionMock = jest.fn().mockReturnValue({ find: findMock });
      getDb.mockReturnValue({ collection: collectionMock });

      const foundTask = await Task.findById('someId');

      expect(foundTask).toBeUndefined();
      expect(getDb).toHaveBeenCalled();
      expect(collectionMock).toHaveBeenCalledWith('task');
      expect(findMock).toHaveBeenCalledWith({ _id: expect.any(Object) });
    });

  });

  describe('deleteById()', () => {

    it('should delete a task by ID', async () => {
      const deleteOneMock = jest.fn().mockResolvedValue({ deletedCount: 1 });
      const collectionMock = jest.fn().mockReturnValue({ deleteOne: deleteOneMock });
      getDb.mockReturnValue({ collection: collectionMock });

      await Task.deleteById('someId');

      expect(getDb).toHaveBeenCalled();
      expect(collectionMock).toHaveBeenCalledWith('task');
      expect(deleteOneMock).toHaveBeenCalledWith({ _id: { $oid: 'someId' } });
    });

    it('should handle deletion failure', async () => {
      const deleteOneMock = jest.fn().mockResolvedValue({ deletedCount: 0 });
      const collectionMock = jest.fn().mockReturnValue({ deleteOne: deleteOneMock });
      getDb.mockReturnValue({ collection: collectionMock });

      await Task.deleteById('nonExistentId');

      expect(getDb).toHaveBeenCalled();
      expect(collectionMock).toHaveBeenCalledWith('task');
      expect(deleteOneMock).toHaveBeenCalledWith({
        _id: { $oid: 'nonExistentId' },
      });
    });

    it('should handle errors during deletion', async () => {
      const dbError = new Error('Deletion error');
      const deleteOneMock = jest.fn().mockRejectedValue(dbError);
      const collectionMock = jest.fn().mockReturnValue({ deleteOne: deleteOneMock });
      getDb.mockReturnValue({ collection: collectionMock });

      await Task.deleteById('someId');

      expect(getDb).toHaveBeenCalled();
      expect(collectionMock).toHaveBeenCalledWith('task');
      expect(deleteOneMock).toHaveBeenCalledWith({ _id: { $oid: 'someId' } });
    });
  });
});