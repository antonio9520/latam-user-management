import { Routes } from '@angular/router';

import { UsersStore } from './store/users.store';
import { USERS_REPOSITORY } from './repository/users.repository';
import { JsonServerUsersRepository } from './repository/json-server-users.repository';

export const usersRoutes: Routes = [
  {
    /**
     * Users feature routes.
     *
     * The parent route provides the feature-level dependencies:
     * - UsersStore: shared state for all Users pages.
     * - USERS_REPOSITORY: repository implementation used by the store.
     *
     * By registering the repository here, the store depends on the abstraction
     * instead of a concrete data source. Replacing json-server with another backend
     * only requires changing this provider.
     */
    path: '',
    providers: [UsersStore, { provide: USERS_REPOSITORY, useClass: JsonServerUsersRepository }],
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
