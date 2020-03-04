import express from 'express';
import { passwordAuth } from './handlers/factory/password-auth';

export const app = express()
  .use('/auth', passwordAuth);
