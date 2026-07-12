import type { FastifyInstance } from 'fastify';

import { tleQuerySchema } from '../schemas/tleQuerySchema.js';
import { getTleRecords } from '../service/tleService.js';

export async function tleRoute(app: FastifyInstance) {
    app.get('/api/tle', async (request, reply) => {
        const queryResult = tleQuerySchema.safeParse(request.query);

        if (!queryResult.success) {
            return reply.status(400).send({
                error: {
                    code: 'INVALID_TLE_GROUP',
                    message: '指定されたTLEグループは利用できません',
                },
            });
        }
        try {
            const response = await getTleRecords({
                group: queryResult.data.group,
            });

            return reply.send(response);
        } catch {
            return reply.status(502).send({
                error: {
                    code: 'TLE_FETCH_FAILED',
                    message: 'TLEデータを取得できませんでした',
                },
            });
        }
    });
}