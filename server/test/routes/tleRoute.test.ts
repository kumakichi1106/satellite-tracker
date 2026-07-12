import { describe, expect, it } from 'vitest';

import { createApp } from '../../src/app.js';

// テスト実行時にCelesTrakへ実通信するので正常系の/api/tle?group=stationsはテストしない。

describe('tleRoute', () => {
    it('許可されていないgroupの場合は400を返す', async () => {
        const app = createApp();

        const response = await app.inject({
            method: 'GET',
            url: '/api/tle?group=invalid',
        });

        expect(response.statusCode).toBe(400);
        expect(response.json()).toEqual({
            message: 'Invalid TLE group',
        });

        await app.close();
    });
});