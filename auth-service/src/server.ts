import express from 'express';
import { json, urlencoded } from 'body-parser';
import { port } from './config/config';

const server = express();

server.set('port', port);
server.use(json());
server.use(urlencoded({ extended: true }));

export default server;