import { server } from './server';
import { getClient as getRedisClient } from './lib/redis/redis';
import { getClient as getSqlClient } from './lib/sql/sql';
import { getPasswordAuthHandlers } from './handlers/factory/password-auth';

export const app = server
  .use('/auth', getPasswordAuthHandlers(
    getRedisClient(),
    getSqlClient(),
  ));
