```typescript
import { Request, Response } from 'express';
import * as uuid from 'uuid';
import { SqlService } from '../../lib/sql/sql';
import _ from '../../lib/utils/utils';

interface ExpectedRequest {
  name: string;
  password: string;
  roles?: string[];
}

interface OKResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
  };
}

interface BadRequestResponse {
  success: boolean;
  errors: string[];
}

const validate = (req: Request): string[] => {
  const errors: string[] = [];
  const minPasswordLength = 6;

  if (_.isEmpty(req.body)) {
    errors.push('Body is empty');
  }

  if (_.isEmpty(req.body.name)) {
    errors.push('Name is empty');
  }

  if (_.isEmpty(req.body.password)) {
    errors.push('Password is empty');
  } else if (!_.isString(req.body.password)) {
    errors.push('Password is not a string');
  } else if (req.body.password.length < minPasswordLength) {
    errors.push(`Password length is less than ${minPasswordLength}`);
  }

  if (!_.isArray(req.body.roles)) {
    errors.push('Roles is not an array');
  }

  return errors;
};

const deserializeRequest = (req: Request): ExpectedRequest => ({
  name: req.body.name,
  password: req.body.password,
  roles: Array.isArray(req.body.roles) && req.body.roles.length > 0 ? req.body.roles : undefined,
});

const serializeResponse = (user: ExpectedRequest & { id: string }): OKResponse => ({
  success: true,
  data: {
    id: user.id,
    name: user.name,
  },
});

const serializeError = (errors: string[]): BadRequestResponse => ({
  success: false,
  errors,
});

export const getSignUpHandler = (sql: SqlService) => async (req: Request, res: Response) => {
  try {
    const validationErrors = validate(req);
    if (validationErrors.length > 0) {
      return res.status(400).json(serializeError(validationErrors));
    }

    const user = { ...deserializeRequest(req), id: uuid.v4() };
    const users = await sql.Send(user);
    if (users.length === 0) {
      throw new Error('User was not created');
    }
    res.status(200).json(serializeResponse(user));
  } catch (err) {
    res.status(500).json(serializeError([err.message]));
  }
};
```

### Improvements Made:
1. **Interface Usage**: Changed `class` to `interface` for `ExpectedRequest`, `OKResponse`, and `BadRequestResponse` since they are used as data structures.
2. **Error Handling**: Changed `Error[]` to `string[]` for validation errors to simplify error handling and serialization.
3. **Return Early**: Used early return in the validation error check to avoid unnecessary processing.
4. **Destructuring**: Used object destructuring for cleaner code when creating the user object.
5. **Error Message Extraction**: Directly extracted error messages from `Error` objects for serialization.
6. **Code Consistency**: Ensured consistent naming and formatting throughout the code.