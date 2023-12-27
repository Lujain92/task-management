import Task from '../../models/task.js'
import { getTasks, getAddTask, postAddTask, deleteTask, getEditTask, postEditTask, getTask } from '../../controllers/task.js';

jest.mock('../../models/task');

describe('test the tasks routes', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('test getTasks function', () => {

    it('should render tasks-list view with tasks', async () => {
      const mockTasks = [
        { _id: '12', name: 'Task 1', dueDate: '2023-12-20' },
        { _id: '23', name: 'Task 2', dueDate: '2023-12-21' },
      ];

      Task.fetchAll.mockResolvedValue(mockTasks);

      const mockRender = jest.fn();
      const mockRes = {
        render: mockRender,
      };

      await getTasks({}, mockRes);

      expect(Task.fetchAll).toHaveBeenCalled();
      expect(mockRender).toHaveBeenCalledWith('tasks-list', {
        tasks: mockTasks,
      });
    });

    it('should catch the error with getTasks', async () => {
      Task.fetchAll.mockRejectedValue(null);
      await getTasks();

      expect(Task.fetchAll).toHaveBeenCalled();
    });

  });

  describe('test getTask function', () => {

    it('should render task-detail view with task', async () => {
      const mockTask = { _id: '12', name: 'Task 1', dueDate: '2023-12-20' };

      Task.findById.mockResolvedValue(mockTask);

      const mockRender = jest.fn();
      const mockRes = {
        render: mockRender,
      };

      const mockReq = {
        params: { taskId: mockTask._id },
      };

      await getTask(mockReq, mockRes);

      expect(Task.findById).toHaveBeenCalledWith(mockTask._id);
      expect(mockRender).toHaveBeenCalledWith('task-detail', {
        task: mockTask,
      });
    });

    it('should render task view with task when no task', async () => {
      Task.findById.mockResolvedValue(null);

      const mockRes = {
        redirect: jest.fn(),
      };

      const mockReq = {
        params: { taskId: 'not-exist' },
      };

      await getTask(mockReq, mockRes);

      expect(mockRes.redirect).toHaveBeenCalledWith('/task');
    });

    it('should catch the error with getTask', async () => {
      Task.findById.mockRejectedValue(null);

      const mockReq = {
        params: { taskId: 'not-exist' },
      };

      await getTask(mockReq);

      expect(Task.findById).toHaveBeenCalled();
    });

  });

  describe('test deleteTask function', () => {

    it('should delete a task and redirect', async () => {
      const mockTaskId = '12';

      Task.deleteById.mockResolvedValue();

      const mockReq = {
        body: { taskId: mockTaskId },
      };
      const mockRes = {
        redirect: jest.fn(),
      };

      await deleteTask(mockReq, mockRes);

      expect(Task.deleteById).toHaveBeenCalledWith(mockTaskId);
      expect(mockRes.redirect).toHaveBeenCalledWith('/task');
    });

    it('should catch the error with deleteTask', async () => {
      const mockTaskId = '12';

      Task.deleteById.mockRejectedValue();

      const mockReq = {
        body: { taskId: mockTaskId },
      };

      await deleteTask(mockReq);

      expect(Task.deleteById).toHaveBeenCalledWith(mockTaskId);
    });

  });

  describe('test getEditTask function', () => {

    it('should render edit-task view when editing a task', async () => {
      const mockTask = { _id: '12', name: 'Task 1', dueDate: '2023-12-20' };

      Task.findById.mockResolvedValue(mockTask);

      const mockRender = jest.fn();
      const mockRes = {
        render: mockRender,
        redirect: jest.fn(),
      };
      const mockReq = {
        params: { taskId: mockTask._id },
        query: { edit: 'true' },
      };

      await getEditTask(mockReq, mockRes);

      expect(Task.findById).toHaveBeenCalledWith(mockTask._id);
      expect(mockRender).toHaveBeenCalledWith('edit-task', {
        editing: 'true',
        task: mockTask,
      });
    });

    it('should redirect when edit mode false', async () => {
      Task.findById.mockResolvedValue(null);

      const mockRender = jest.fn();
      const mockRes = {
        render: mockRender,
        redirect: jest.fn(),
      };
      const mockReq = {
        params: { taskId: 'nonExistentId' },
        query: { edit: false },
      };

      await getEditTask(mockReq, mockRes);

      expect(mockRes.redirect).toHaveBeenCalledWith('/task');
    });

    it('should catch the error with getEditTask', async () => {
      const mockTaskId = 'nonExistentId';
      Task.findById.mockRejectedValue();

      const mockReq = {
        params: { taskId: mockTaskId },
        query: { edit: true },
      };

      await getEditTask(mockReq);

      expect(Task.findById).toHaveBeenCalledWith(mockTaskId);
    });

    it('should redirect when editing a non-existent task', async () => {
      Task.findById.mockResolvedValue(null);

      const mockRender = jest.fn();
      const mockRes = {
        render: mockRender,
        redirect: jest.fn(),
      };
      const mockReq = {
        params: { taskId: 'nonExistentId' },
        query: { edit: 'true' },
      };

      await getEditTask(mockReq, mockRes);

      expect(Task.findById).toHaveBeenCalledWith('nonExistentId');
      expect(mockRes.redirect).toHaveBeenCalledWith('/task');
    });

  });

  describe('test postEditTask function', () => {

    it('should update a task and redirect', async () => {
      const mockTaskId = '12';
      const mockTask = {
        _id: '12',
        name: 'Updated Task',
        dueDate: '2023-12-21',
      };

      const mockSave = jest.fn();

      Task.mockImplementation(() => {
        return {
          save: mockSave,
        };
      });

      mockSave.mockResolvedValue(mockTask);

      const mockReq = {
        body: { taskId: mockTaskId, name: 'Task', dueDate: '2023-12-21' },
      };
      const mockRes = {
        redirect: jest.fn(),
      };

      await postEditTask(mockReq, mockRes);

      expect(mockSave).toHaveBeenCalled();
      expect(mockRes.redirect).toHaveBeenCalledWith('/task');
    });

    it('should catch the error with postEditTask', async () => {
      const mockTaskId = '12';
      const mockTask = {
        _id: '12',
        name: 'Updated Task',
        dueDate: '2023-12-21',
      };
      const task = new Task(mockTask);

      Task.mockImplementation(() => task);

      task.save.mockRejectedValue(mockTask);

      const mockReq = {
        body: { taskId: mockTaskId, name: 'Task', dueDate: '2023-12-21' },
      };

      await postEditTask(mockReq);

      expect(task.save).toHaveBeenCalled();
    });

  });

  describe('test getAddTask function', () => {

    it('should render edit-task view for adding a task', async () => {
      const mockRender = jest.fn();
      const mockRes = {
        render: mockRender,
      };

      await getAddTask({}, mockRes);

      expect(mockRender).toHaveBeenCalledWith('edit-task');
    });

  });

  describe('test postAddTask function', () => {
    
    it('should create a new task and redirect', async () => {
      const mockTask = { name: 'new Task', dueDate: '2023-12-21' };
      const task = new Task(mockTask);

      Task.mockImplementation(() => task);

      task.save.mockResolvedValue(mockTask);

      const mockReq = {
        body: mockTask,
      };
      const mockRes = {
        redirect: jest.fn(),
      };

      await postAddTask(mockReq, mockRes);

      expect(task.save).toHaveBeenCalled();
      expect(mockRes.redirect).toHaveBeenCalledWith('/task');
    });

    it('should catch the error with postAddTask', async () => {
      const mockTask = { name: 'new Task', dueDate: '2023-12-21' };
      const task = new Task(mockTask);

      Task.mockImplementation(() => task);

      task.save.mockRejectedValue(mockTask);

      const mockReq = {
        body: mockTask,
      };

      await postAddTask(mockReq);

      expect(task.save).toHaveBeenCalled();
    });
  });

});
