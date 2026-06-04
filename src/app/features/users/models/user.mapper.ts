import { DummyJsonUser } from './dummyjson-user.model';
import { User } from './user.model';

export function mapDummyJsonUserToUser(raw: DummyJsonUser): User {
  return {
    id: raw.id,
    username: raw.username,
    email: raw.email,
    firstName: raw.firstName,
    lastName: raw.lastName,
    role: raw.role,
    active: raw.id % 5 !== 0,
  };
}
