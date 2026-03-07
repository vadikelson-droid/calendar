import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getTasks, createTask, updateTask, deleteTask, reorderTasks } from '../controllers/tasks.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/reorder', reorderTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
