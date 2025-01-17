import { Request, Response } from 'express';
import { RedisService } from '../../lib/redis/redis';
import { SqlService } from '../../lib/sql/sql';

export const getSignInHandler = (redis: RedisService, sql: SqlService) => 
  async (req: Request, res: Response): Promise<void> => {
    try {
      await redis.setValue('key', 'value');
      const value = await redis.getValue('key');
      const user = await sql.Get(); // Assuming Get() is an async function

      res.status(200).json({
        user,
        success: true,
        token: value,
      });
    } catch (err) {
      console.error('Error in getSignInHandler:', err); // Log the error for debugging
      res.status(500).json({
        success: false, // Corrected to false since it's an error
        error: err.message || 'Internal Server Error', // Provide a more descriptive error message
      });
    }
  };