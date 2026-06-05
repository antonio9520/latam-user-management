import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { UsersStore } from '../../store/users.store';
import { User } from '../../models/user.model';
import { UserStatusBadgeComponent } from '../user-status-badge/user-status-badge.component';
import { UserRoleBadgeComponent } from '../user-role-badge/user-role-badge.component';

@Component({
  selector: 'app-users-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    UserStatusBadgeComponent,
    UserRoleBadgeComponent,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent {
  protected readonly store = inject(UsersStore);
  private readonly router = inject(Router);

  readonly deleteRequest = output<User>();
  readonly deactivateRequest = output<User>();
  readonly activateRequest = output<User>();
  readonly pageChange = output<number>();

  readonly displayedColumns = [
    'name',
    'username',
    'email',
    'role',
    'status',
    'createdAt',
    'actions',
  ];

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event.pageIndex);
  }

  onView(user: User): void {
    this.router.navigate(['/users', user.id]);
  }

  onEdit(user: User): void {
    this.router.navigate(['/users', user.id, 'edit']);
  }

  onDelete(user: User): void {
    this.deleteRequest.emit(user);
  }

  onDeactivate(user: User): void {
    this.deactivateRequest.emit(user);
  }

  onActivate(user: User): void {
    this.activateRequest.emit(user);
  }
}
