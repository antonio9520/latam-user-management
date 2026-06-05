import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User, CreateUserPayload, UpdateUserPayload } from '../models/user.model';
import { PaginatedUsers, UserListParams, UsersApiService } from '../services/users-api.service';
import { UsersRepository } from './users.repository';

/**
 * Infrastructure implementation of the UsersRepository port.
 *
 * This adapter bridges the application layer and the underlying data source.
 * It encapsulates infrastructure-specific concerns and delegates data access
 * operations to UsersApiService.
 *
 * By depending on the UsersRepository abstraction, the rest of the feature
 * remains independent from HTTP clients, API conventions and backend
 * implementation details.
 */
@Injectable()
export class JsonServerUsersRepository implements UsersRepository {
  private readonly api = inject(UsersApiService);

  getUsers(params?: UserListParams): Observable<PaginatedUsers> {
    return this.api.getUsers(params);
  }

  searchUsers(query: string, params?: UserListParams): Observable<PaginatedUsers> {
    return this.api.searchUsers(query, params);
  }

  getUserById(id: string): Observable<User> {
    return this.api.getUserById(id);
  }

  createUser(payload: CreateUserPayload): Observable<User> {
    return this.api.createUser(payload);
  }

  updateUser(id: string, payload: UpdateUserPayload): Observable<User> {
    return this.api.updateUser(id, payload);
  }

  deleteUser(id: string): Observable<unknown> {
    return this.api.deleteUser(id);
  }
}
