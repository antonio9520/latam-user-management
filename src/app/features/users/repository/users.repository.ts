import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { User, CreateUserPayload, UpdateUserPayload } from '../models/user.model';
import { PaginatedUsers, UserListParams } from '../services/users-api.service';

/**
 * Repository contract for user data access.
 *
 * Layer: Application
 *
 * Application services and stores must depend on this abstraction rather than
 * a concrete implementation. This allows the underlying data source to be
 * replaced (REST API, GraphQL, mock server, etc.) without affecting business
 * logic or presentation components.
 *
 * Implementations of this contract belong to the infrastructure layer.
 */
export interface UsersRepository {
  getUsers(params?: UserListParams): Observable<PaginatedUsers>;
  searchUsers(query: string, params?: UserListParams): Observable<PaginatedUsers>;
  getUserById(id: string): Observable<User>;
  createUser(payload: CreateUserPayload): Observable<User>;
  updateUser(id: string, payload: UpdateUserPayload): Observable<User>;
  deleteUser(id: string): Observable<unknown>;
}

/**
 * Dependency injection token used to resolve the active UsersRepository
 * implementation at runtime.
 *
 * The concrete implementation is configured through Angular providers,
 * allowing the application layer to remain independent from infrastructure
 * details.
 */
export const USERS_REPOSITORY = new InjectionToken<UsersRepository>('UsersRepository');
