import type { FastifyInstance } from 'fastify';

import { tleQuerySchema } from '../schemas/tleQuerySchema.js';
import { getTleRecords } from '../service/tleService.js';

export async function tleRoute(app: FastifyInstance) {
    app.get('/api/tle', async (request, reply) => {
        const queryResult = tleQuerySchema.safeParse(request.query);

        if (!queryResult.success) {
            return reply.status(400).send({
                message: 'Invalid TLE group',
            });
        }

        const records = await getTleRecords({
            group: queryResult.data.group,
        });

        return reply.send(records);
    });
}