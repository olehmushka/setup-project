import { Request, Response } from 'express';

export const getSignUpHandler = () =>
  (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      token: '',
    });
  };
