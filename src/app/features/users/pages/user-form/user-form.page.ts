import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UsersStore } from '../../store/users.store';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { CreateUserPayload } from '../../models/user.model';

@Component({
  selector: 'app-user-form-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserFormComponent, MatButtonModule, MatIconModule],
  templateUrl: './user-form.page.html',
})
export class UserFormPage implements OnDestroy {
  protected readonly store = inject(UsersStore);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  constructor() {
    effect(() => {
      const status = this.store.saveStatus();
      if (status === 'saved') {
        const createdUser = this.store.selectedUser();
        this.snackBar.open('User created successfully', 'Close', { duration: 3000 });
        if (createdUser) {
          this.router.navigate(['/users', createdUser.id]);
        } else {
          this.router.navigate(['/users']);
        }
      } else if (status === 'error') {
        this.snackBar.open(this.store.saveError() ?? 'An unexpected error occurred', 'Close', {
          duration: 5000,
        });
      }
    });
  }

  ngOnDestroy(): void {
    // Reset so stale signals do not re-trigger effects on next visit.
    this.store.resetSaveStatus();
    this.store.resetSelectedUser();
  }

  onSubmit(payload: CreateUserPayload): void {
    this.store.createUser(payload);
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
