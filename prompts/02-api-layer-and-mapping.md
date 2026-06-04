# API Layer and Data Mapping

## Goal

Design the typed API service layer and mapping strategy for DummyJSON users.

## Prompt

I am building an Angular 17+ user management SPA for a frontend challenge.

The challenge requires:

- All HTTP calls must go through a typed service layer.
- No direct HttpClient calls inside components.
- An HttpInterceptor must handle the API base URL and centralized errors.
- The app should consume a public mock API.
- I chose DummyJSON: https://dummyjson.com/users

DummyJSON uses fields like:

- id
- username
- email
- firstName
- lastName

The challenge schema expects:

- id
- username
- email
- first_name
- last_name
- role: admin | user | guest
- created_at
- updated_at
- active

I want to keep an internal frontend model using camelCase:

- firstName
- lastName
- createdAt
- updatedAt

Please propose a clean Angular implementation for:

1. User model.
2. DummyJSON response model.
3. Mapper function from API user to internal User.
4. UsersApiService methods for list, search, get by id, create, update, delete.
5. How to handle fields missing from DummyJSON such as role, active, createdAt, updatedAt.
6. What should be documented in README.md about this mapping.

Constraints:

- Use strict TypeScript.
- Use Angular HttpClient.
- Do not put API calls in components.
- Keep the solution simple and defendable.
