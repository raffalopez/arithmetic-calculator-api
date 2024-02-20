import supertest from 'supertest';

import { sequelize } from '../lib/sequelize';
import app from '../app';
import { server } from '..';

describe('test for p/users path', () => {
  let api: supertest.SuperTest<supertest.Test> | null = null;

  beforeEach(() => {
    app;
    api = supertest(app);
  });

  describe('GET /users', () => {
    test('should return the list of users', async () => {
      const response = await api?.get('/api/v1/users');

      expect(response).toBeTruthy();
      expect(response?.body).toHaveLength(3);
    });
  });

  describe('GET /users:id', () => {
    test('should return a user by its id', async () => {
      const response = await api?.get(
        '/api/v1/users/5fe9c7c4-735b-402c-b039-19f01608cc2e',
      );
      console.log(response?.body);

      expect(response).toBeTruthy();
      expect(response?.status).toEqual(200);
      expect(response?.body.id).toEqual('5fe9c7c4-735b-402c-b039-19f01608cc2e');
    });
  });

  describe('POST /users', () => {
    test('should return a 400 Bad request with password invalid', async () => {
      const inputData = {
        email: 'admin1@admin.com',
        password: '123456',
        amount: 2000,
        isActive: false,
      };
      const { statusCode, body }: any = await api?.post('/api/v1/users');
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/password/);
    });

    test('should return a 400 Bad request with email invalid', async () => {
      const inputData = {
        email: 'admin1@admin',
        password: '123456',
        amount: 2000,
        isActive: false,
      };
      const { statusCode, body }: any = await api?.post('/api/v1/users');
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/email/);
    });
  });

  afterAll(() => {
    server.close();
    sequelize.close();
  });
});
