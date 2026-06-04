import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UsersStore } from '../../store/users.store';
import { UsersFiltersComponent } from '../../components/users-filters/users-filters.component';
import { UsersTableComponent } from '../../components/users-table/users-table.component';

@Component({
  selector: 'app-users-list-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatButtonModule, MatIconModule, UsersFiltersComponent, UsersTableComponent],
  templateUrl: './users-list.page.html',
})
export class UsersListPage implements OnInit {
  protected readonly store = inject(UsersStore);

  ngOnInit(): void {
    this.store.loadUsers();
  }
}
