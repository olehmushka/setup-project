import * as express from 'express';
import { getSignInHandler } from '../password-auth/sign-in';
import { getSignUpHandler } from '../password-auth/sign-up';

export const getPasswordAuthHandlers = () =>
  express.Router()
    .post('/sign-in', getSignInHandler())
    .post('/sign-up', getSignUpHandler());
