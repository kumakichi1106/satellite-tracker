import type { FastifyInstance } from 'fastify';

export async function healthRoute(app: FastifyInstance) {
  app.get('/api/health', async () => {
    return {
      status: 'ok',
    };
  });
}