import { Request, Response } from 'express';
import { RedisService } from '../../lib/redis/redis';

export const getSignInHandler = (redis: RedisService) =>
  async (req: Request, res: Response) => {
    try {
      await redis.setValue('key', 'value');
      const value = await redis.getValue('key');
      res.status(200).json({
        success: true,
        token: value,
      });
    } catch (err) {
      res.status(200).json({
        success: true,
        token: err,
      });
    }
  };
