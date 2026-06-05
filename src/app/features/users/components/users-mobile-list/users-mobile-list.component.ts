import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

import { User } from '../../models/user.model';
import { UserRoleBadgeComponent } from '../user-role-badge/user-role-badge.component';
import { UserStatusBadgeComponent } from '../user-status-badge/user-status-badge.component';

@Component({
  selector: 'app-users-mobile-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTooltipModule,
    UserRoleBadgeComponent,
    UserStatusBadgeComponent,
  ],
  templateUrl: './users-mobile-list.component.html',
  styleUrl: './users-mobile-list.component.css',
})
export class UsersMobileListComponent {
  private readonly router = inject(Router);

  readonly users = input.required<User[]>();
  readonly total = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly skip = input.required<number>();

  readonly deleteRequest = output<User>();
  readonly deactivateRequest = output<User>();
  readonly activateRequest = output<User>();
  readonly pageChange = output<number>();

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

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event.pageIndex);
  }
}
