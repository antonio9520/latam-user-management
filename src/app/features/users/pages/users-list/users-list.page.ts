import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UsersStore } from '../../store/users.store';
import { UsersFiltersComponent } from '../../components/users-filters/users-filters.component';
import { UsersTableComponent } from '../../components/users-table/users-table.component';
import { User } from '../../models/user.model';
import { UserFilters } from '../../models/user-filter.model';
import { UserRole } from '../../models/user-role.type';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DEACTIVATE_USER_DIALOG } from '../../utils/deactivate-dialog.config';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButtonModule, MatIconModule, UsersFiltersComponent, UsersTableComponent],
  templateUrl: './users-list.page.html',
})
export class UsersListPage implements OnInit {
  protected readonly store = inject(UsersStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      const status = this.store.deleteStatus();
      if (status === 'deleted') {
        this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
        this.store.resetDeleteStatus();
      } else if (status === 'error') {
        this.snackBar.open(this.store.deleteError() ?? 'An unexpected error occurred', 'Close', {
          duration: 5000,
        });
        this.store.resetDeleteStatus();
      }
    });

    effect(() => {
      const status = this.store.deactivateStatus();
      if (status === 'deactivated') {
        this.snackBar.open('User deactivated successfully', 'Close', { duration: 3000 });
        this.store.resetDeactivateStatus();
      } else if (status === 'error') {
        this.snackBar.open(
          this.store.deactivateError() ?? 'An unexpected error occurred',
          'Close',
          { duration: 5000 },
        );
        this.store.resetDeactivateStatus();
      }
    });

    effect(() => {
      const status = this.store.activateStatus();
      if (status === 'activated') {
        this.snackBar.open('User activated successfully', 'Close', { duration: 3000 });
        this.store.resetActivateStatus();
      } else if (status === 'error') {
        this.snackBar.open(this.store.activateError() ?? 'An unexpected error occurred', 'Close', {
          duration: 5000,
        });
        this.store.resetActivateStatus();
      }
    });
  }

  ngOnInit(): void {
    const qp = this.route.snapshot.queryParams;

    const page = Math.max(1, Number(qp['page']) || 1);
    const search: string = qp['search'] ?? '';
    const role = (qp['role'] as UserRole) || undefined;
    const active = qp['active'] === undefined ? undefined : qp['active'] === 'true';

    this.store.initFromParams({
      skip: (page - 1) * this.store.pageSize,
      filters: { search, role, active },
    });
  }

  onPageChange(pageIndex: number): void {
    const page = pageIndex + 1;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
    this.store.setPage((page - 1) * this.store.pageSize);
    this.store.loadUsers();
  }

  onFiltersChange(partial: Partial<UserFilters>): void {
    // Merge the incoming partial with the current store filters so a role
    // change does not wipe out the current search value and vice-versa.
    const current = this.store.filters();
    const merged: UserFilters = { ...current, ...partial };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        search: merged.search || null,
        role: merged.role ?? null,
        active: merged.active === undefined ? null : String(merged.active),
      },
      queryParamsHandling: 'merge',
    });
    this.store.setFilters(partial);
    this.store.loadUsers();
  }

  onDeleteRequest(user: User): void {
    const data: ConfirmDialogData = {
      title: 'Delete user',
      message: `Are you sure you want to delete @${user.username}? This action cannot be undone.`,
      confirmLabel: 'Delete',
      // Default confirmColor 'warn' — most severe action.
    };

    this.dialog
      .open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, { data })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.store.deleteUser(user.id);
        }
      });
  }

  onDeactivateRequest(user: User): void {
    this.dialog
      .open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, {
        data: DEACTIVATE_USER_DIALOG,
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this.store.deactivateUser(user.id);
        }
      });
  }

  onActivateRequest(user: User): void {
    this.store.activateUser(user.id);
  }
}
