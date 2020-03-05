import { Request, Response } from 'express';
import * as uuid from 'uuid';
import { SqlService } from '../../lib/sql/sql';
import _ from '../../lib/utils/utils';

class ExpectedRequest {
  public name: string;
  public password: string;
  public roles?: string[];
}

class OKResponse {
  public success: boolean;
  public data: {
    id: string,
    name: string,
  };
}
class BadRequestResponse {
  public success: boolean;
  public errors: string[];
}

const validate = (req: Request): Error[] => {
  const errors: Error[] = [];
  const minPasswordLength = 6;

  if (_.isEmpty(req.body)) {
    errors.push(new Error('Body is empty'));
  }

  if (_.isEmpty(req.body.name)) {
    errors.push(new Error('name is empty'));
  }

  if (_.isEmpty(req.body.password)) {
    errors.push(new Error('password is empty'));
  } else if (!_.isString(req.body.password)) {
    errors.push(new Error('password is not string'));
  } else if (req.body.password.length < minPasswordLength) {
    errors.push(new Error(`password length is less than ${minPasswordLength}`));
  }

  if (!_.isArray(req.body.roles)) {
    errors.push(new Error('roles is not array'));
  }

  return errors;
};

const deserializeRequest = (req: Request): ExpectedRequest => {
  if (Array.isArray(req.body.roles) && req.body.roles.length > 0) {
    return {
      name: req.body.name,
      password: req.body.password,
      roles: req.body.roles,
    };
  }
  return {
    name: req.body.name,
    password: req.body.password,
  };
};

const serializeResponse = (u: ExpectedRequest & { id: string }, isSuccess: boolean): OKResponse => {
  return {
    success: isSuccess,
    data: {
      id: u.id,
      name: u.name,
    },
  };
};

const serializeError = (errors: Error[]): BadRequestResponse =>
  ({
    success: false,
    errors: errors.map(err => err.message),
  });

export const getSignUpHandler = (sql: SqlService): (req: Request, res: Response) => void =>
  async (req: Request, res: Response) => {
    try {
      const validationErrors = validate(req);
      if (validationErrors.length !== 0) {
        res.status(400).json(serializeError(validationErrors));
      }

      const u = { ...deserializeRequest(req), id: uuid.v4() };
      const users = await sql.Send(u);
      if (users.length === 0) {
        throw new Error('user was not created');
      }
      res.status(200).json(serializeResponse(u, true));
    } catch (err) {
      res.status(500).json(serializeError([err as Error]));
    }
  };
