import { describe, test, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import dogRoutes from '../routes/dogRoutes';
import { getDogImage } from '../controllers/dogController';

vi.mock('../controllers/dogController', () => ({
  getDogImage: vi.fn()
}));

describe('dogRoutes', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/dogs', dogRoutes);

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  //Test 4 - Positive
  test('GET /api/dogs/random returns 200 and dog image data', async () => {
    const mockResponse = {
      success: true,
      data: {
        imageUrl:
          'https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg',
        status: 'success'
      }
    };

    (getDogImage as any).mockImplementation(
      async (_req: any, res: any) => {
        res.status(200).json(mockResponse);
      }
    );

    const res = await request(app).get('/api/dogs/random');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.imageUrl).toContain('stbernard');
  });

  // Test 5 - Negative
  test('GET /api/dogs/random should return 500 on error', async () => {
    (getDogImage as any).mockImplementation(
      async (_req: any, res: any) => {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch dog image: Network error'
        });
      }
    );

    const res = await request(app).get('/api/dogs/random');

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe(
      'Failed to fetch dog image: Network error'
    );
  });
});