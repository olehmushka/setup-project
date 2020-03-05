import { Request, Response } from 'express';
import { RedisService } from '../../lib/redis/redis';
import { SqlService } from '../../lib/sql/sql';

export const getSignInHandler = (redis: RedisService, sql: SqlService): (req: Request, res: Response) => void =>
  async (req: Request, res: Response) => {
    try {
      await redis.setValue('key', 'value');
      const value = await redis.getValue('key');
      res.status(200).json({
        u: sql.Get(),
        success: true,
        token: value,
      });
    } catch (err) {
      res.status(500).json({
        success: true,
        token: err,
      });
    }
  };
