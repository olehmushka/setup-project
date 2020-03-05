import * as express from 'express';
import { RedisService } from '../../lib/redis/redis';
import { getSignInHandler } from '../password-auth/sign-in';
import { getSignUpHandler } from '../password-auth/sign-up';

export const getPasswordAuthHandlers = (redis : RedisService) =>
  express.Router()
    .post('/sign-in', getSignInHandler(redis))
    .post('/sign-up', getSignUpHandler());
