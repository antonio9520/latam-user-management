import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { UsersStore } from '../../store/users.store';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CreateUserPayload } from '../../models/user.model';
import { DEACTIVATE_USER_DIALOG } from '../../utils/deactivate-dialog.config';

@Component({
  selector: 'app-user-edit-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserFormComponent, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './user-edit.page.html',
})
export class UserEditPage implements OnInit, OnDestroy {
  protected readonly store = inject(UsersStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  protected readonly userId = this.route.snapshot.paramMap.get('id') ?? '';

  constructor() {
    effect(() => {
      const status = this.store.saveStatus();
      if (status === 'saved') {
        this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/users', this.userId]);
      } else if (status === 'error') {
        this.snackBar.open(this.store.saveError() ?? 'An unexpected error occurred', 'Close', {
          duration: 5000,
        });
      }
    });
  }

  ngOnInit(): void {
    this.store.loadUserById(this.userId);
  }

  ngOnDestroy(): void {
    this.store.resetSaveStatus();
    this.store.resetSelectedUser();
  }

  onSubmit(payload: CreateUserPayload): void {
    const isDeactivating = this.store.selectedUser()?.active === true && payload.active === false;

    if (isDeactivating) {
      // Deactivating requires explicit confirmation — challenge compliance:
      // destructive actions (deactivate, delete) always require user confirmation.
      this.dialog
        .open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, {
          data: DEACTIVATE_USER_DIALOG,
        })
        .afterClosed()
        .subscribe((confirmed) => {
          if (confirmed) {
            this.store.updateUser(this.userId, payload);
          }
        });
    } else {
      this.store.updateUser(this.userId, payload);
    }
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
