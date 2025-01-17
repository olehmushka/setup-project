import Debug from 'debug';
import { app } from './app';

const debug = Debug('http');
const port = app.get('port');
const env = app.get('env');

app.listen(port, () => {
  debug(`App is running at http://localhost:${port} in ${env} mode`);
  debug('Press CTRL-C to stop');
});

export { app };