import { ConfirmDialogData } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

/**
 * Shared dialog configuration for the deactivate user confirmation.
 *
 * Centralizing this config guarantees that the same title, message, labels
 * and color are shown regardless of where deactivation is triggered
 * (users table or user edit page).
 *
 * Challenge compliance: destructive actions (deactivate, delete) require
 * explicit user confirmation before execution.
 */
export const DEACTIVATE_USER_DIALOG: ConfirmDialogData = {
  title: 'Deactivate user?',
  message:
    'This user will lose active access to the platform. The account can be reactivated later.',
  confirmLabel: 'Deactivate user',
  // 'primary' signals the action is reversible — less severe than Delete (warn).
  confirmColor: 'primary',
};
