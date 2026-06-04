import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { User } from '../models/user.model';
import { DummyJsonUser, DummyJsonUsersResponse } from '../models/dummyjson-user.model';
import { mapDummyJsonUserToUser } from '../models/user.mapper';

export interface PaginatedUsers {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserListParams {
  limit?: number;
  skip?: number;
}

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly http = inject(HttpClient);

  /**
   * Fetches a paginated list of users.
   * Filtering by role/active is handled client-side in the store
   * because DummyJSON does not support those query params.
   */
  getUsers(params: UserListParams = {}): Observable<PaginatedUsers> {
    const httpParams = new HttpParams()
      .set('limit', params.limit ?? 10)
      .set('skip', params.skip ?? 0);

    return this.http
      .get<DummyJsonUsersResponse>('/users', { params: httpParams })
      .pipe(map(this.mapPaginatedResponse));
  }

  /**
   * Full-text search across firstName, lastName, email, username.
   * Supported natively by DummyJSON via /users/search?q=.
   */
  searchUsers(query: string, params: UserListParams = {}): Observable<PaginatedUsers> {
    const httpParams = new HttpParams()
      .set('q', query)
      .set('limit', params.limit ?? 10)
      .set('skip', params.skip ?? 0);

    return this.http
      .get<DummyJsonUsersResponse>('/users/search', { params: httpParams })
      .pipe(map(this.mapPaginatedResponse));
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<DummyJsonUser>(`/users/${id}`).pipe(map(mapDummyJsonUserToUser));
  }

  /**
   * DummyJSON /users/add does not persist data but returns a valid shaped
   * response. The returned object is mapped to the internal User model.
   */
  createUser(payload: Omit<User, 'id'>): Observable<User> {
    return this.http.post<DummyJsonUser>('/users/add', payload).pipe(map(mapDummyJsonUserToUser));
  }

  updateUser(id: number, payload: Partial<Omit<User, 'id'>>): Observable<User> {
    return this.http.put<DummyJsonUser>(`/users/${id}`, payload).pipe(map(mapDummyJsonUserToUser));
  }

  deleteUser(id: number): Observable<{ id: number; isDeleted: boolean }> {
    return this.http.delete<{ id: number; isDeleted: boolean }>(`/users/${id}`);
  }

  private readonly mapPaginatedResponse = (res: DummyJsonUsersResponse): PaginatedUsers => ({
    users: res.users.map(mapDummyJsonUserToUser),
    total: res.total,
    skip: res.skip,
    limit: res.limit,
  });
}
