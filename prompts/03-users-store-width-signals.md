# Users Store with Angular Signals

## Goal

Design a simple users domain store using Angular Signals.

## Prompt

I am building a small Angular user management SPA for a frontend challenge.

The app has:

- User list
- Pagination
- Search
- Filters by role and active status
- User detail
- Create user
- Edit user
- Delete/deactivate user
- Loading, empty and error states

I chose Angular Signals instead of NgRx because the domain is small and I want less boilerplate.

Please design a UsersStoreService using Angular Signals.

Requirements:

1. Store users list.
2. Store selected user.
3. Store loading state.
4. Store error state.
5. Store pagination state.
6. Store filters.
7. Expose readonly signals/computed values.
8. Methods for loadUsers, loadUserById, createUser, updateUser, deleteUser/deactivateUser.
9. Keep API calls in UsersApiService.
10. Make it easy to explain in an interview.

Do not overengineer it. Avoid NgRx-like boilerplate.
