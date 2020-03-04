import express from 'express';
import { getPasswordAuthHandlers } from './handlers/factory/password-auth';

export const app = express()
  .use('/auth', getPasswordAuthHandlers());
