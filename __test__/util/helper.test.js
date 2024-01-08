import { overDueTask } from '../../util/helper.js';

describe('overDueTask', () => {
    it('should return true if the task is unchecked and overdue', () => {
        const result = overDueTask(null, '2024-01-01');
        expect(result).toBe(true);
    });

    it('should return false if the task is checked and overdue', () => {
        const result = overDueTask(true, '2023-12-01');
        expect(result).toBe(false);
    });

    it('should return false if the task is unchecked but not overdue', () => {
        const result = overDueTask(undefined, '2025-01-01');
        expect(result).toBe(false);
    });

    it('should return false if the task is checked and not overdue', () => {
        const result = overDueTask(true, '2023-12-01');
        expect(result).toBe(false);
    });
});
