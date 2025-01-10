Here are some improvements to the TypeScript code:

1. Use a constant for the port to avoid calling `app.get('port')` multiple times.
2. Add type annotations where applicable.
3. Use template literals consistently.

```typescript
import Debug from 'debug';
import { app } from './app';

const debug = Debug('http');
const port: number = app.get('port');
const environment: string = app.get('env');

app.listen(port, () => {
  debug(`App is running at http://localhost:${port} in ${environment} mode`);
  debug('Press CTRL-C to stop');
});

export { app };
```

These changes make the code slightly more efficient and readable by reducing repeated calls and adding type annotations for clarity.