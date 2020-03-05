import Debug from 'debug';
import { app } from './app';

const debug = Debug('http');

app.listen(app.get('port'), () => {
  debug(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  debug('Press CTRL-C to stop');
});

export { app };
