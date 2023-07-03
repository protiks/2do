import express from 'express';
import { createTodo, deleteTodo, getTodos, updateTodo } from '../controllers/controller';

const router = express.Router();

router.get('/todos', getTodos);
router.post('/todos', createTodo);
router.delete('/todos/:id', deleteTodo);
router.patch('/todos/:id', updateTodo);

export default router;
