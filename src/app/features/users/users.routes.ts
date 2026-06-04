import { Routes } from '@angular/router';

import { UsersStore } from './store/users.store';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/users-list/users-list.page').then((m) => m.UsersListPage),
    // Provide the store at the route level so it is scoped to this feature
    // and destroyed when the user navigates away.
    providers: [UsersStore],
  },
];
