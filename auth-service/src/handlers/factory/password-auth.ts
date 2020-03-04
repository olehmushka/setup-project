import * as express from 'express';
import { signIn } from '../password-auth/sign-in';
import { signUp } from '../password-auth/sign-up';

export const passwordAuth = express.Router()
  .post('/sign-in', signIn)
  .post('/sign-up', signUp);
