import { describe, expect, it } from 'vitest';

import { createApp } from '../../src/app.js';

describe('healthRoute', () => {
    it('GET /api/health は200を返す', async () => {
        const app = createApp();

        const response = await app.inject({
            method: 'GET',
            url: '/api/health',
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toEqual({
            status: 'ok',
        });

        await app.close();
    });
});