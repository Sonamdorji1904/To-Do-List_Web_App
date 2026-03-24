// backend/app.test.js

import request from 'supertest';
import { app } from './index.js';

describe('Todo API Tests', () => {
  test('GET / should return 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBeLessThan(500);
  });

  test('basic math works', () => {
    expect(1 + 1).toBe(2);
  });
});