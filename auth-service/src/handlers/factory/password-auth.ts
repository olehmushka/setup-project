import * as express from 'express';
import { RedisService } from '../../lib/redis/redis';
import { SqlService } from '../../lib/sql/sql';
import { getSignInHandler } from '../password-auth/sign-in';
import { getSignUpHandler } from '../password-auth/sign-up';

export const getPasswordAuthHandlers = (redis: RedisService, sql: SqlService) =>
  express.Router()
    .post('/sign-in', getSignInHandler(redis, sql))
    .post('/sign-up', getSignUpHandler(sql));
