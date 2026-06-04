import { computed, inject, Injectable, signal } from '@angular/core';

import { UsersApiService } from '../services/users-api.service';
import { User, CreateUserPayload, UpdateUserPayload } from '../models/user.model';
import { UserFilters } from '../models/user-filter.model';

type LoadStatus = 'idle' | 'loading' | 'success' | 'error';
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

/**
 * Signal-based store for the users feature.
 * Provided at the route level so its lifetime is tied to the feature.
 *
 * Responsibilities:
 *  - Own all async state (users, pagination, status, error).
 *  - Apply client-side role/active filters (DummyJSON does not support them).
 *  - Delegate HTTP calls to UsersApiService.
 *
 * Components must NOT call UsersApiService directly.
 */
@Injectable()
export class UsersStore {
  private readonly api = inject(UsersApiService);

  // --- private writable state ---
  private readonly _users = signal<User[]>([]);
  private readonly _status = signal<LoadStatus>('idle');
  private readonly _error = signal<string | null>(null);
  private readonly _filters = signal<UserFilters>({ search: '' });
  private readonly _total = signal(0);
  private readonly _skip = signal(0);
  private readonly _saveStatus = signal<SaveStatus>('idle');
  private readonly _saveError = signal<string | null>(null);
  private readonly _selectedUser = signal<User | null>(null);
  private readonly _selectedStatus = signal<LoadStatus>('idle');
  private readonly _selectedError = signal<string | null>(null);

  readonly pageSize = 10;

  // --- public read-only signals ---
  readonly status = this._status.asReadonly();
  readonly error = this._error.asReadonly();
  readonly filters = this._filters.asReadonly();
  readonly total = this._total.asReadonly();
  readonly skip = this._skip.asReadonly();
  readonly saveStatus = this._saveStatus.asReadonly();
  readonly saveError = this._saveError.asReadonly();
  readonly selectedUser = this._selectedUser.asReadonly();
  readonly selectedStatus = this._selectedStatus.asReadonly();
  readonly selectedError = this._selectedError.asReadonly();

  readonly isLoading = computed(() => this._status() === 'loading');
  readonly hasError = computed(() => this._status() === 'error');
  readonly isSaving = computed(() => this._saveStatus() === 'saving');
  readonly isLoadingSelected = computed(() => this._selectedStatus() === 'loading');
  readonly selectedNotFound = computed(() => this._selectedStatus() === 'error');

  /**
   * Role and active filters are applied client-side because DummyJSON
   * does not expose those query parameters. Search is server-side.
   */
  readonly filteredUsers = computed(() => {
    const { role, active } = this._filters();
    return this._users().filter((user) => {
      if (role && user.role !== role) return false;
      if (active !== undefined && user.active !== active) return false;
      return true;
    });
  });

  readonly isEmpty = computed(
    () => this._status() === 'success' && this.filteredUsers().length === 0,
  );

  // --- actions ---

  loadUsers(): void {
    const filters = this._filters();
    this._status.set('loading');
    this._error.set(null);

    const params = { limit: this.pageSize, skip: this._skip() };
    const request$ = filters.search
      ? this.api.searchUsers(filters.search, params)
      : this.api.getUsers(params);

    request$.subscribe({
      next: (result) => {
        this._users.set(result.users);
        console.log('Store Users', this._users());
        this._total.set(result.total);
        this._status.set('success');
      },
      error: (err: Error) => {
        this._error.set(err.message);
        this._status.set('error');
      },
    });
  }

  /**
   * Updates one or more filter values and reloads from page 0.
   * Resets skip so pagination always returns to page 1 on filter change.
   */
  setFilters(partial: Partial<UserFilters>): void {
    this._filters.update((current) => ({ ...current, ...partial }));
    this._skip.set(0);
    this.loadUsers();
  }

  setPage(skip: number): void {
    this._skip.set(skip);
    this.loadUsers();
  }

  deleteUser(id: number): void {
    // Optimistically remove from local list; DummyJSON does not persist.
    this._users.update((users) => users.filter((u) => u.id !== id));
    this.api.deleteUser(id).subscribe();
  }

  createUser(payload: CreateUserPayload): void {
    this._saveStatus.set('saving');
    this._saveError.set(null);

    this.api.createUser(payload).subscribe({
      next: (user) => {
        // DummyJSON does not persist — prepend optimistically to local list.
        this._users.update((list) => [user, ...list]);
        this._total.update((t) => t + 1);
        this._saveStatus.set('saved');
      },
      error: (err: Error) => {
        this._saveError.set(err.message);
        this._saveStatus.set('error');
      },
    });
  }

  /** Reset save state when leaving the form page to avoid stale signals. */
  resetSaveStatus(): void {
    this._saveStatus.set('idle');
    this._saveError.set(null);
  }

  loadUserById(id: number): void {
    this._selectedStatus.set('loading');
    this._selectedError.set(null);
    this._selectedUser.set(null);

    this.api.getUserById(id).subscribe({
      next: (user) => {
        this._selectedUser.set(user);
        this._selectedStatus.set('success');
      },
      error: (err: Error) => {
        this._selectedError.set(err.message);
        this._selectedStatus.set('error');
      },
    });
  }

  updateUser(id: number, payload: UpdateUserPayload): void {
    this._saveStatus.set('saving');
    this._saveError.set(null);

    this.api.updateUser(id, payload).subscribe({
      next: (updated) => {
        // DummyJSON does not persist — replace optimistically in local list.
        this._users.update((list) => list.map((u) => (u.id === updated.id ? updated : u)));
        this._selectedUser.set(updated);
        this._saveStatus.set('saved');
      },
      error: (err: Error) => {
        this._saveError.set(err.message);
        this._saveStatus.set('error');
      },
    });
  }

  /** Reset selected-user state when leaving the edit page. */
  resetSelectedUser(): void {
    this._selectedUser.set(null);
    this._selectedStatus.set('idle');
    this._selectedError.set(null);
  }
}
