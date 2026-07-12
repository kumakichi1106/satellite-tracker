import { describe, expect, it } from 'vitest';

import { tleQuerySchema } from '../../src/schemas/tleQuerySchema.js';

describe('tleQuerySchema', () => {
    it('groupが未指定の場合はstationsを使う', () => {
        const result = tleQuerySchema.parse({});

        expect(result.group).toBe('stations');
    });

    it('許可されたTLEグループを受け付ける', () => {
        expect(tleQuerySchema.parse({ group: 'stations' }).group).toBe('stations');
        expect(tleQuerySchema.parse({ group: 'weather' }).group).toBe('weather');
        expect(tleQuerySchema.parse({ group: 'gps-ops' }).group).toBe('gps-ops');
        expect(tleQuerySchema.parse({ group: 'active' }).group).toBe('active');
    });

    it('許可されていないTLEグループはエラーにする', () => {
        const result = tleQuerySchema.safeParse({ group: 'error' });

        expect(result.success).toBe(false);
    });
});