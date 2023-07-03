/* eslint-disable no-console */
import request from 'supertest';
import { beforeEach, describe, it, expect } from '@jest/globals';
import app from './app';
import { Response } from 'superagent';

export type Todo = {
	id: string;
	title: string;
};

describe('GET /', function () {
	it('responds with todos array', async () => {
		const response = await request(app).get('/');
		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({ 'hello': 'world!' });
	});
});

describe('GET /todos', function () {
	let getResponse: Response;

	beforeEach(async () => {
		getResponse = await request(app).get('/todos');
	});

	it('returns status 200', () => {
		expect(getResponse.status).toBe(200);
	});

	it('returns a list of new todos', () => {
		expect(Array.isArray(getResponse.body)).toBe(true);
	});
});

describe('POST /todos', () => {
	let postResponse: Response;

	beforeEach(async () => {
		postResponse = await request(app).post('/todos').send({ todo: 'Example Todo' });
	});

	it('should return status 201 for a valid todo', () => {
		expect(postResponse.status).toBe(201);
	});

	it('should return the created todo', () => {
		expect(postResponse.body).toEqual(expect.objectContaining({ id: expect.any(String), title: 'Example Todo' }));
	});

	it('should not add the todo if it already exists (case-insensitive check)', async () => {
		const duplicateResponse = await request(app).post('/todos').send({ todo: 'example todo' });
		expect(duplicateResponse.status).toBe(409);
		expect(duplicateResponse.body).toEqual({ message: 'Todo with the same title already exists' });
	});

	it('should return status 400 for an empty todo', async () => {
		const emptyResponse = await request(app).post('/todos').send({ todo: '' });
		expect(emptyResponse.status).toBe(400);
		expect(emptyResponse.body).toEqual({ message: 'Invalid format' });
	});

	it('should return status 400 for a todo exceeding the maximum length', async () => {
		const longResponse = await request(app).post('/todos').send({ todo: 'A'.repeat(251) });
		expect(longResponse.status).toBe(400);
		expect(longResponse.body).toEqual({ message: 'Exceeded string length' });
	});
});

