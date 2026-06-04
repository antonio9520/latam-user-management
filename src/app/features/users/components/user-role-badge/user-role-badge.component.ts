import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { UserRole } from '../../models/user-role.type';

const ROLE_STYLES: Record<UserRole, string> = {
  admin: 'role-admin',
  user: 'role-user',
  guest: 'role-guest',
};

@Component({
  selector: 'app-user-role-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <span class="role-badge" [class]="styleClass()">{{ role() }}</span> `,
  styles: `
    .role-badge {
      display: inline-flex;
      align-items: center;
      border-radius: 9999px;
      padding: 2px 10px;
      font-size: 12px;
      font-weight: 500;
      text-transform: capitalize;
      white-space: nowrap;
    }
    .role-admin {
      background: #f3e8ff;
      color: #6b21a8;
    }
    .role-user {
      background: #dbeafe;
      color: #1d4ed8;
    }
    .role-guest {
      background: #f3f4f6;
      color: #6b7280;
    }
  `,
})
export class UserRoleBadgeComponent {
  readonly role = input.required<UserRole>();
  protected readonly styleClass = computed(() => `role-badge ${ROLE_STYLES[this.role()]}`);
}
