import { UserRole } from './user-role.type';

export interface UserFilters {
  search: string;
  role?: UserRole;
  active?: boolean;
}
