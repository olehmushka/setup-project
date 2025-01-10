Here are some improvements to the TypeScript code:

1. Use the built-in `express.json()` and `express.urlencoded()` middleware instead of `body-parser`, as `body-parser` is now part of Express.
2. Use TypeScript's type annotations for better type safety.
3. Consider using environment variables directly for configuration if applicable.

Here's the improved code:

```typescript
import express, { Application } from 'express';
import { port } from './config/config';

const app: Application = express();

app.set('port', port)
   .use(express.json())
   .use(express.urlencoded({ extended: true }));

export const server = app;
```

This version uses the built-in middleware for parsing JSON and URL-encoded data, and it also adds type annotations for the `app` variable.