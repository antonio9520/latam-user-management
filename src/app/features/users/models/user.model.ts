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
