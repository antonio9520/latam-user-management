import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { User } from '../models/user.model';

export interface PaginatedUsers {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface PaginatedResponse {
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
  prev: number | null;
}

export interface HttpResponse<T> {
  data: T;
}

export interface UserListResponse extends HttpResponse<User[]>, PaginatedResponse {}

export interface UserListParams {
  limit?: number;
  skip?: number;
  role?: string;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  private readonly http = inject(HttpClient);

  getUsers(params: UserListParams = {}): Observable<PaginatedUsers> {
    const skip = params.skip ?? 0;
    const limit = params.limit ?? 10;
    const page = Math.floor(skip / limit) + 1;
    let httpParams = new HttpParams().set('_page', page).set('_per_page', limit);

    if (params.role && params.role !== 'all') {
      httpParams = httpParams.set('role', params.role);
    }

    if (params.status && params.status !== 'all') {
      httpParams = httpParams.set('active', params.status === 'active' ? 'true' : 'false');
    }

    return this.http
      .get<UserListResponse>('/users', { params: httpParams, observe: 'response' })
      .pipe(
        map((res) => {
          console.log('Raw API response:', res);
          return {
            users: res.body?.data ?? [],
            total: res.body?.items ?? 0,
            skip,
            limit,
          };
        }),
      );
  }

  /**
   * NOTE:
   * Search is intentionally performed client-side due to json-server limitations.
   * The mock API supports basic filtering but does not provide a realistic
   * full-text search implementation across multiple user fields.
   *
   * In a real-world application, search, filtering and pagination should be
   * executed on the server side.
   */
  searchUsers(query: string, params: UserListParams = {}): Observable<PaginatedUsers> {
    const skip = params.skip ?? 0;
    const limit = params.limit ?? 10;

    let httpParams = new HttpParams();

    if (params.role && params.role !== 'all') {
      httpParams = httpParams.set('role', params.role);
    }

    if (params.status && params.status !== 'all') {
      httpParams = httpParams.set('active', params.status === 'active' ? 'true' : 'false');
    }

    return this.http.get<User[]>('/users', { params: httpParams, observe: 'response' }).pipe(
      map((res) => {
        const users = res.body ?? [];
        const normalizedQuery = query.trim().toLowerCase();

        const filteredUsers = normalizedQuery
          ? users.filter((user) => {
              const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

              return (
                fullName.includes(normalizedQuery) ||
                user.username.toLowerCase().includes(normalizedQuery) ||
                user.email.toLowerCase().includes(normalizedQuery) ||
                user.firstName.toLowerCase().includes(normalizedQuery) ||
                user.lastName.toLowerCase().includes(normalizedQuery)
              );
            })
          : users;

        return {
          users: filteredUsers.slice(skip, skip + limit),
          total: filteredUsers.length,
          skip,
          limit,
        };
      }),
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`/users/${id}`);
  }

  createUser(payload: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>('/users', payload);
  }

  updateUser(id: number, payload: Partial<Omit<User, 'id'>>): Observable<User> {
    return this.http.patch<User>(`/users/${id}`, payload);
  }

  /** json-server returns {} on DELETE; the store ignores the response body. */
  deleteUser(id: number): Observable<unknown> {
    return this.http.delete(`/users/${id}`);
  }
}
