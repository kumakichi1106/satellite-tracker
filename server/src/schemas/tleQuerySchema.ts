import { z } from 'zod';

import { TLE_GROUPS } from '../constants/tleGroups.js';

export const tleQuerySchema = z.object({
    group: z.enum(TLE_GROUPS).default('stations'),
});

export type TleQuery = z.infer<typeof tleQuerySchema>;