import request from 'supertest';
import { beforeEach, describe, it, expect } from '@jest/globals';
import app_v2 from './app_v2';
import { Response } from 'superagent';

describe('GET /todos', () => {
	let getResponse: Response;

	beforeEach(async () => {
		getResponse = await request(app_v2).get('/todos');
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
		postResponse = await request(app_v2).post('/todos').send({ todo: 'Example Todo' });
	});

	it('should return status 201 for a valid todo', () => {
		expect(postResponse.status).toBe(201);
	});

	it('should return the error message', () => {
		expect(postResponse.body).toEqual(
			expect.objectContaining({ message: 'Todo with the same title already exists' }),
		);
	});

	it('should return status 409 for a duplicate todo', async () => {
		const duplicateResponse = await request(app_v2).post('/todos').send({ todo: 'Example Todo' });
		expect(duplicateResponse.status).toBe(409);
	});

	it('should return a message indicating the duplicate todo', async () => {
		const duplicateResponse = await request(app_v2).post('/todos').send({ todo: 'Example Todo' });
		expect(duplicateResponse.body).toEqual(
			expect.objectContaining({ message: 'Todo with the same title already exists' }),
		);
	});
});

describe('POST /todos - Conflict', () => {
	let postResponse: Response;

	beforeEach(async () => {
		postResponse = await request(app_v2).post('/todos').send({ todo: 'Example Todo' });
	});

	it('should return status 409 for a conflicting todo', () => {
		expect(postResponse.status).toBe(409);
	});

	it('should return the error message', () => {
		expect(postResponse.body).toEqual(expect.objectContaining({ message: 'Todo with the same title already exists' }));
	});
});
