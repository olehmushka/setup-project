import { Request, Response } from 'express';

export const getSignInHandler = () =>
  (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      token: '',
    });
  };
