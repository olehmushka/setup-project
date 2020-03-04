import * as bodyParser from 'body-parser';
import Debug from 'debug';
import { app } from './app';
import { port } from './config/config';

const debug = Debug('http');

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(app.get('port'), () => {
  debug(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  debug('Press CTRL-C to stop');
});

export { app };
