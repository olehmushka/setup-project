import express from 'express';
import * as bodyParser from 'body-parser';
import { port } from './config/config';

export const server = express()
  .set('port', port)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));
