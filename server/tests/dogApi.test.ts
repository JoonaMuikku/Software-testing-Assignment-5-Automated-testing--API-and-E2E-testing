import { describe, test, expect } from 'vitest';
import request from 'supertest';

const BASE_URL = 'http://localhost:5000';

describe('Dog API', () => {

  // Test 1 - Positive
  test('GET /api/dogs/random should return valid dog image data', async () => {
    const res = await request(BASE_URL).get('/api/dogs/random');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();
    expect(res.body.data.imageUrl).toBeDefined();
    expect(typeof res.body.data.imageUrl).toBe('string');
  });


  // Test 2 - Negative test for invalid route
  test('GET /api/dogs/invalid should return 404', async () => {
    const res = await request(BASE_URL).get('/api/dogs/invalid');

    expect(res.status).toBe(404);
    expect(res.body.error).toBeDefined();
    expect(res.body.error).toBe('Route not found');
  });

});