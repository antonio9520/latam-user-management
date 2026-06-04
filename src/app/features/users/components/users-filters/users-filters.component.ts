import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { UsersStore } from '../../store/users.store';
import { UserRole } from '../../models/user-role.type';

@Component({
  selector: 'app-users-filters',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule],
  templateUrl: './users-filters.component.html',
})
export class UsersFiltersComponent {
  protected readonly store = inject(UsersStore);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchSubject = new Subject<string>();

  readonly roleOptions: { value: UserRole | ''; label: string }[] = [
    { value: '', label: 'All roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'guest', label: 'Guest' },
  ];

  readonly activeOptions: { value: 'true' | 'false' | ''; label: string }[] = [
    { value: '', label: 'All statuses' },
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Inactive' },
  ];

  constructor() {
    // Debounce search input so every keystroke does not fire an HTTP request.
    this.searchSubject
      .pipe(debounceTime(350), takeUntilDestroyed(this.destroyRef))
      .subscribe((query) => this.store.setFilters({ search: query }));
  }

  onSearchInput(value: string): void {
    this.searchSubject.next(value);
  }

  onRoleChange(value: UserRole | ''): void {
    this.store.setFilters({ role: value || undefined });
  }

  onActiveChange(value: 'true' | 'false' | ''): void {
    const active = value === '' ? undefined : value === 'true';
    this.store.setFilters({ active });
  }
}
