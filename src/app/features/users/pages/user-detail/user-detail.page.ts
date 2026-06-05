import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UsersStore } from '../../store/users.store';
import { UserRoleBadgeComponent } from '../../components/user-role-badge/user-role-badge.component';
import { UserStatusBadgeComponent } from '../../components/user-status-badge/user-status-badge.component';

@Component({
  selector: 'app-user-detail-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UserRoleBadgeComponent,
    UserStatusBadgeComponent,
  ],
  templateUrl: './user-detail.page.html',
})
export class UserDetailPage implements OnInit, OnDestroy {
  protected readonly store = inject(UsersStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly userId = Number(this.route.snapshot.paramMap.get('id'));
  protected readonly invalidId = isNaN(this.userId) || this.userId <= 0;

  ngOnInit(): void {
    if (this.invalidId) return;
    this.store.resetSelectedUser();
    this.store.loadUserById(this.userId);
  }

  ngOnDestroy(): void {
    this.store.resetSelectedUser();
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  goToEdit(): void {
    this.router.navigate(['/users', this.userId, 'edit']);
  }
}
