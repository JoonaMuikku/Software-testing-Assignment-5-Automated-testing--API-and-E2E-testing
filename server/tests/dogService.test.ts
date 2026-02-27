import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('dogService', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // Test 1 - Positive
  test('should return dog image url and success status', async () => {
    const mockApiResponse = {
      message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    };

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockApiResponse
    });

    vi.stubGlobal('fetch', mockFetch);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockApiResponse.message);
    expect(result.status).toBe('success');
    expect(mockFetch).toHaveBeenCalledOnce();
  });


  // Test 2 - Negative
  test('should throw error when API response is not "ok"', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

    vi.stubGlobal('fetch', mockFetch);

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );
  });
});