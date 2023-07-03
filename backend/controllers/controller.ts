import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import { v4 as uuid } from 'uuid';
import data from '../Data';
import Todo from '../models/TodoModel';

export const getTodos = (req: Request, res: Response) => {
	console.log(data);
	res.send(data);
	console.log('\x1b[36m%s\x1b[0m', '[INFO] GET /todos');
};

export function createTodo(req: Request, res: Response) {
	const { todo } = req.body;

	if (!todo || typeof todo !== 'string' || todo.trim().length === 0) {
		return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid format' });
	}

	const trimmedTitle = todo.trim();

	const existingTodo = data.find((t) => t.title === trimmedTitle);

	if (existingTodo) {
		return res.status(HttpStatus.CONFLICT).send({ message: 'Todo with the same title already exists' });
	}

	const newTodo = new Todo(uuid(), trimmedTitle, false);

	console.log('\x1b[36m%s\x1b[0m', '[SUCCESS] POST /todos', newTodo);
	data.push(newTodo);
	return res.status(HttpStatus.CREATED).send(newTodo);
}

export function deleteTodo(req: Request, res: Response) {
	const id = req.params.id;
	const todoIndex = data.findIndex((todo) => todo.id === id);
	if (todoIndex === -1) {
		res.status(HttpStatus.NOT_FOUND).send({ message: 'Invalid todo id' });
		console.log('\x1b[31m%s\x1b[0m', `[ERROR] DELETE /todos/${id} - Invalid todo id`);
	} else {
		data.splice(todoIndex, 1);
		res.send({ message: 'Todo deleted successfully' });
		console.log('\x1b[32m%s\x1b[0m', `[SUCCESS] DELETE /todos/${id} - Todo deleted successfully`);
	}
}

export function updateTodo(req: Request, res: Response) {
	const { id } = req.params;
	const { title, complete } = req.body;

	if (!title || typeof title !== 'string' || title.trim() === '') {
		console.log(`[ERROR] PATCH /todos/${id} - Invalid or missing updatedTitle`);
		return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid or missing updatedTitle' });
	}

	const todo = data.find((todo) => todo.id === id);

	if (!todo) {
		console.log(`[ERROR] PATCH /todos/${id} - Invalid todo id`);
		return res.status(HttpStatus.NOT_FOUND).send({ message: 'Invalid todo id' });
	}

	todo.title = title;
	todo.complete = complete;

	console.log(`[SUCCESS] PATCH /todos/${id} - Todo updated successfully`);
	res.send({ message: 'Todo updated successfully' });
}