import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-user-status-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="status-badge"
      [class.active]="active()"
      [class.inactive]="!active()"
      [attr.aria-label]="active() ? 'Active' : 'Inactive'"
    >
      {{ active() ? 'Active' : 'Inactive' }}
    </span>
  `,
  styles: `
    .status-badge {
      display: inline-flex;
      align-items: center;
      border-radius: 9999px;
      padding: 2px 10px;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
    }
    .active {
      background: #dcfce7;
      color: #166534;
    }
    .inactive {
      background: #f3f4f6;
      color: #6b7280;
    }
  `,
})
export class UserStatusBadgeComponent {
  readonly active = input.required<boolean>();
}
