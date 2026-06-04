# Reactive User Form

## Goal

Build a reusable Angular Reactive Form component for creating and editing users.

## Prompt

I am building an Angular user management SPA.

I need a reusable UserFormComponent for both create and edit flows.

Fields:

- username
- email
- firstName
- lastName
- role
- active

Validation rules:

- email must be valid
- username is required
- username must have a minimum length
- username must not contain spaces
- role must be one of: admin, user, guest

Please propose:

1. A Reactive Forms implementation.
2. A reusable component API using inputs/outputs.
3. Field-level error messages.
4. Form-level error handling.
5. How to keep the component presentational and avoid putting API calls inside it.
6. Accessibility considerations for labels and errors.

Use Angular standalone components and Angular Material.
