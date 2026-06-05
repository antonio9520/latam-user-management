import { computed, inject, Injectable, signal } from '@angular/core';

import { UsersApiService } from '../services/users-api.service';
import { User, CreateUserPayload, UpdateUserPayload } from '../models/user.model';
import { UserFilters } from '../models/user-filter.model';

type LoadStatus = 'idle' | 'loading' | 'success' | 'error';
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
type DeleteStatus = 'idle' | 'deleting' | 'deleted' | 'error';

/**
 * Signal-based store for the users feature.
 * Provided at the route level so its lifetime is scoped to the feature.
 *
 * Responsibilities:
 *  - Own the feature state and expose reactive signals to the UI.
 *  - Manage loading, error and mutation states.
 *  - Coordinate filtering, searching and pagination.
 *  - Keep URL query parameters and store state synchronized.
 *  - Delegate all data access concerns to UsersApiService.
 *
 * Notes:
 *  - Search is implemented client-side due to json-server limitations.
 *  - Filters are applied through API query parameters whenever possible.
 *  - Components must never access UsersApiService directly.
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
  private readonly _deleteStatus = signal<DeleteStatus>('idle');
  private readonly _deleteError = signal<string | null>(null);

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
  readonly deleteStatus = this._deleteStatus.asReadonly();
  readonly deleteError = this._deleteError.asReadonly();

  readonly isLoading = computed(() => this._status() === 'loading');
  readonly hasError = computed(() => this._status() === 'error');
  readonly isSaving = computed(() => this._saveStatus() === 'saving');
  readonly isDeleting = computed(() => this._deleteStatus() === 'deleting');
  readonly isLoadingSelected = computed(() => this._selectedStatus() === 'loading');
  readonly selectedNotFound = computed(() => this._selectedStatus() === 'error');

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

    const params = {
      limit: this.pageSize,
      skip: this._skip(),
      role: filters.role,
      status: filters.active !== undefined ? (filters.active ? 'active' : 'inactive') : 'all',
    };
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
   * Hydrates store state from URL query params and triggers the first load.
   * Call once in ngOnInit of the list page after reading the route snapshot.
   */
  initFromParams(params: { skip: number; filters: UserFilters }): void {
    this._skip.set(params.skip);
    this._filters.set(params.filters);
    this.loadUsers();
  }

  /**
   * Updates one or more filter values WITHOUT triggering a load.
   * The container is responsible for calling loadUsers() after updating the URL.
   */
  setFilters(partial: Partial<UserFilters>): void {
    this._filters.update((current) => ({ ...current, ...partial }));
    this._skip.set(0);
  }

  /**
   * Updates the skip offset WITHOUT triggering a load.
   * The container is responsible for calling loadUsers() after updating the URL.
   */
  setPage(skip: number): void {
    this._skip.set(skip);
  }

  deleteUser(id: number): void {
    // Snapshot the user before removing so we can roll back on error.
    const snapshot = this._users().find((u) => u.id === id) ?? null;

    this._deleteStatus.set('deleting');
    this._deleteError.set(null);

    // Optimistic removal.
    this._users.update((users) => users.filter((u) => u.id !== id));

    this.api.deleteUser(id).subscribe({
      next: () => {
        // DummyJSON does not persist — keep the local removal.
        this._total.update((t) => Math.max(0, t - 1));
        this._deleteStatus.set('deleted');
      },
      error: (err: Error) => {
        // Rollback: restore the user at its original position.
        if (snapshot) {
          this._users.update((users) => {
            const index = users.findIndex((u) => u.id > snapshot.id);
            const copy = [...users];
            copy.splice(index === -1 ? copy.length : index, 0, snapshot);
            return copy;
          });
        }
        this._deleteError.set(err.message);
        this._deleteStatus.set('error');
      },
    });
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

  /** Reset delete state after snackbar has been shown. */
  resetDeleteStatus(): void {
    this._deleteStatus.set('idle');
    this._deleteError.set(null);
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
