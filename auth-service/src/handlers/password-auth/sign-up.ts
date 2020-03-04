import { Request, Response } from 'express';

export const signUp = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    token: '',
  });
};
