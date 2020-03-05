import express from 'express';
import { getClient } from './lib/redis/redis';
import { getPasswordAuthHandlers } from './handlers/factory/password-auth';

export const app = express()
  .use('/auth', getPasswordAuthHandlers(getClient()));
