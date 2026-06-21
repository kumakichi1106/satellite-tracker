import Fastify from 'fastify';
import { healthRoute } from './routes/healthRoute.js';

export function createApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(healthRoute);

  return app;
}