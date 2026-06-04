import { UserRole } from './user-role.type';

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Fields required to create a new user. Excludes server-assigned fields. */
export type CreateUserPayload = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

/** Partial update payload — all fields optional to match DummyJSON PUT semantics. */
export type UpdateUserPayload = Partial<CreateUserPayload>;
