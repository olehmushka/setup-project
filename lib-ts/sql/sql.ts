Here are some improvements to the TypeScript code:

1. Use interfaces to define the structure of objects.
2. Use more descriptive method names.
3. Use TypeScript's type system to avoid using `any`.
4. Improve the logic in the `Get` method to correctly filter users by `id`.
5. Use `readonly` for properties that should not be modified after initialization.
6. Add error handling for unsupported queries.

```typescript
export interface IUserRepo {
  id: string;
  name: string;
  password: string;
  roles: string[];
}

class MockSQL {
  private users: IUserRepo[] = [];

  public query(query: string, user?: IUserRepo): IUserRepo[] | undefined {
    const lowerCaseQuery = query.toLowerCase();
    if (lowerCaseQuery.startsWith('select')) {
      return this.users;
    }
    if (lowerCaseQuery.startsWith('insert') && user) {
      this.users = [...this.users, user];
      return this.users;
    }
    throw new Error('Unsupported query');
  }
}

const createClient = (): MockSQL => {
  return new MockSQL();
};

export const getClient = (): SqlService => new SqlService(createClient());

export class SqlService {
  private readonly client: MockSQL;

  constructor(client: MockSQL) {
    this.client = client;
  }

  public getUserById(id?: string): IUserRepo[] {
    const users = this.client.query('select');
    if (id) {
      return users.filter((user: IUserRepo) => user.id === id);
    }
    return users;
  }

  public addUser(user: IUserRepo): IUserRepo[] {
    return this.client.query('insert', user);
  }
}
```

### Key Changes:
- Defined an `IUserRepo` interface for user objects.
- Changed `MockSQL` to use `IUserRepo` instead of `UserRepo`.
- Improved method names in `SqlService` to `getUserById` and `addUser`.
- Used `filter` in `getUserById` to correctly return users with the specified `id`.
- Added error handling for unsupported queries in `MockSQL`.
- Used `readonly` for the `client` property in `SqlService` to prevent reassignment.