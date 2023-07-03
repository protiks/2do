/* eslint-disable no-console */
import express from 'express';
import { v4 as uuid } from 'uuid';
import HttpStatus from './httpStatus';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
	);
	next();
});

type Todo = {
	id: string;
	title: string;
	complete: boolean;
};

const todos: Todo[] = [
	{
		id: 'e7a9b683-6b17-4d5b-8f5e-9e5a2b1b16de',
		title: 'Build a Working To-do',
		complete: false,
	},
];

app.get('/', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.status(HttpStatus.OK);
	res.json({ hello: 'world!' });
	console.log('\x1b[36m%s\x1b[0m', '[INFO] GET /');
});

app.get('/todos', (req, res) => {
	console.log(todos);
	res.send(todos);
	console.log('\x1b[36m%s\x1b[0m', '[INFO] GET /todos');
});

app.post('/todos', (req, res) => {
	const { todo } = req.body;

	if (!todo || typeof todo !== 'string' || todo.trim().length === 0) {
		return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid format' });
	}

	const trimmedTitle = todo.trim();

	const existingTodo = todos.find((t) => t.title === trimmedTitle);

	if (existingTodo) {
		return res.status(HttpStatus.CONFLICT).send({ message: 'Todo with the same title already exists' });
	}

	const newTodo = {
		id: uuid(),
		title: trimmedTitle,
		complete: false,
	};

	console.log('\x1b[36m%s\x1b[0m', '[SUCCESS] POST /todos', newTodo);
	todos.push(newTodo);
	return res.status(HttpStatus.CREATED).send(newTodo);
});

app.delete('/todos/:id', (req, res) => {
	const id = req.params.id;
	const todoIndex = todos.findIndex((todo) => todo.id === id);
	if (todoIndex === -1) {
		res.status(HttpStatus.NOT_FOUND).send({ message: 'Invalid todo id' });
		console.log('\x1b[31m%s\x1b[0m', `[ERROR] DELETE /todos/${id} - Invalid todo id`);
	} else {
		todos.splice(todoIndex, 1);
		res.send({ message: 'Todo deleted successfully' });
		console.log('\x1b[32m%s\x1b[0m', `[SUCCESS] DELETE /todos/${id} - Todo deleted successfully`);
	}
});

app.patch('/todos/:id', (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	const { complete } = req.body;

	if (!title || typeof title !== 'string' || title.trim() === '') {
		console.log(`[ERROR] PATCH /todos/${id} - Invalid or missing updatedTitle`);
		return res.status(HttpStatus.BAD_REQUEST).send({ message: 'Invalid or missing updatedTitle' });
	}

	const todo = todos.find((todo) => todo.id === id);

	if (!todo) {
		console.log(`[ERROR] PATCH /todos/${id} - Invalid todo id`);
		return res.status(HttpStatus.NOT_FOUND).send({ message: 'Invalid todo id' });
	}

	todo.title = title;
	todo.complete = complete;

	console.log(`[SUCCESS] PATCH /todos/${id} - Todo updated successfully`);
	res.send({ message: 'Todo updated successfully' });
});

export default app;
