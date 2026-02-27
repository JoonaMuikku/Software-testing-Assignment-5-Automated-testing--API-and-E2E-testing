import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';

describe('dogController', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  //Test 3 - Positive
  test('should return success true and dog image data', async () => {
    const mockData = {
      imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(mockData);

    const json = vi.fn();
    const status = vi.fn(() => ({ json }));
    const res: any = { json, status };

    await getDogImage({} as any, res);

    expect(json).toHaveBeenCalledWith({
      success: true,
      data: mockData
    });
  });
});