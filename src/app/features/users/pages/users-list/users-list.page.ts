import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UsersStore } from '../../store/users.store';
import { UsersFiltersComponent } from '../../components/users-filters/users-filters.component';
import { UsersTableComponent } from '../../components/users-table/users-table.component';
import { User } from '../../models/user.model';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButtonModule, MatIconModule, UsersFiltersComponent, UsersTableComponent],
  templateUrl: './users-list.page.html',
})
export class UsersListPage implements OnInit {
  protected readonly store = inject(UsersStore);
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
  }

  ngOnInit(): void {
    this.store.loadUsers();
  }

  onDeleteRequest(user: User): void {
    const data: ConfirmDialogData = {
      title: 'Delete user',
      message: `Are you sure you want to delete @${user.username}? This action cannot be undone.`,
      confirmLabel: 'Delete',
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
}
