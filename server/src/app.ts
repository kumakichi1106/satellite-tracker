import Fastify from 'fastify';
import { healthRoute } from './routes/healthRoute.js';
import { tleRoute } from './routes/tleRoute.js';

export function createApp() {
  const app = Fastify({
    logger: true,
  });

  app.register(healthRoute);
  app.register(tleRoute);

  return app;
}