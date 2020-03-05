export class UserRepo {
  public id: string;
  public name: string;
  public password: string;
  public roles: string[];
}

class MockSQL {
  public users: UserRepo[] = [];
  public query(query: string, u?: UserRepo): any {
    if (query.toLowerCase().startsWith('select')) {
      return this.users;
    }
    if (query.toLowerCase().startsWith('insert')) {
      this.users = [...this.users, u];
      return this.users;
    }
  }
}

const createClient = () => {
  return new MockSQL();
};

export const getClient = () => new SqlService(createClient());

export class SqlService {
  private _client: any;

  constructor(client: any) {
    this._client = client;
  }

  public Get(id?: string) {
    if (id) {
      return this._client.query('select').map((u: any) => (u as UserRepo).id === id);
    }
    return this._client.query('select');
  }

  public Send(u: any) {
    return this._client.query('insert', u);
  }
}
