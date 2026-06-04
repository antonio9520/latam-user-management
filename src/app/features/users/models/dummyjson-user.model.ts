import { UserRole } from './user-role.type';

/**
 * Minimal shape of a user object returned by the DummyJSON API.
 * Only the fields consumed by this application are declared here.
 * Full schema: https://dummyjson.com/docs/users
 */
export interface DummyJsonUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

/**
 * Envelope returned by DummyJSON list/search endpoints.
 */
export interface DummyJsonUsersResponse {
  users: DummyJsonUser[];
  total: number;
  skip: number;
  limit: number;
}
