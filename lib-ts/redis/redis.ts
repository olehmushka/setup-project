Here are some improvements to the TypeScript code:

1. Use `async/await` for better readability.
2. Use more specific types instead of `any`.
3. Handle the client connection lifecycle properly.
4. Use `redis.createClient` options to handle connection strings.
5. Add error handling for client connection.

Here's the improved code:

```typescript
import * as redis from 'redis';

export const redisHost = 'redis://redis-service';

export const getClient = () => new RedisService(redis.createClient({ url: redisHost }));

export class RedisService {
  private _client: redis.RedisClientType;

  constructor(client: redis.RedisClientType) {
    this._client = client;
    this._client.connect().catch((err) => {
      console.error('Failed to connect to Redis:', err);
    });
  }

  public async getValue(key: string): Promise<string | null> {
    try {
      return await this._client.get(key);
    } catch (err) {
      console.error('Error getting value from Redis:', err);
      throw err;
    }
  }

  public async setValue(key: string, value: string): Promise<void> {
    try {
      await this._client.set(key, value);
    } catch (err) {
      console.error('Error setting value in Redis:', err);
      throw err;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this._client.disconnect();
    } catch (err) {
      console.error('Error disconnecting from Redis:', err);
    }
  }
}
```

### Key Changes:
- **Async/Await**: The `getValue` and `setValue` methods now use `async/await` for better readability.
- **Types**: The return type of `getValue` is `Promise<string | null>` to reflect the possible return values from Redis.
- **Connection Handling**: The client connects in the constructor and has a `disconnect` method to close the connection properly.
- **Error Handling**: Added error handling for connection and operation errors, logging them to the console.