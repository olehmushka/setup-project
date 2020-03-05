import * as redis from 'redis';

export const redisHost = 'redis://redis-service';

export const getClient = () => new RedisService(redis.createClient(redisHost));

export class RedisService {
  private _client: redis.RedisClient;

  constructor(client: redis.RedisClient) {
    this._client = client;
  }

  public getValue(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._client.get(key, (err: Error, value: any): void => {
        if (err) {
          reject(err);
          return;
        }
        resolve(value);
    });
    });
  }

  public setValue(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this._client.set(key, value, (err: Error): void => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}
