import { Routes } from '@angular/router';

import { UsersStore } from './store/users.store';

export const usersRoutes: Routes = [
  {
    // Parent shell: provides UsersStore for all child routes so that both
    // the list and the form page share the same store instance.
    path: '',
    providers: [UsersStore],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/users-list/users-list.page').then((m) => m.UsersListPage),
      },
      {
        path: 'new',
        loadComponent: () => import('./pages/user-form/user-form.page').then((m) => m.UserFormPage),
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./pages/user-edit/user-edit.page').then((m) => m.UserEditPage),
      },
    ],
  },
];
