import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { UsersStore } from '../../store/users.store';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { CreateUserPayload } from '../../models/user.model';

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
  private readonly snackBar = inject(MatSnackBar);

  protected readonly userId = Number(this.route.snapshot.paramMap.get('id'));

  constructor() {
    effect(() => {
      const status = this.store.saveStatus();
      if (status === 'saved') {
        this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
        this.router.navigate(['/users']);
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
    this.store.updateUser(this.userId, payload);
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
