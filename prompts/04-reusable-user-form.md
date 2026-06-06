# Reusable User Form

## Goal

Avoid duplicated create and edit user forms by reusing the same component and validation logic.

## Prompt

The Create User and Edit User screens are practically identical.

I don't think it makes sense to maintain two separate forms.

Would you keep a single reusable form component for both flows?

If so:

- how should it support create and edit modes?
- how can validations be shared?
- how can we keep the implementation simple without overengineering it?

## Accepted

- A shared form component for both create and edit flows.
- Reuse of the same fields and validation rules.
- A single source of truth for the form UI.
- A simpler maintenance model for future changes.

## Discarded

- Separate form components for create and edit.
- Duplicated validation logic.
- Duplicated UI structure.
- Additional abstractions that were not required by the challenge scope.

## Modified

- Replaced the original separate form approach with a single reusable component.
- Adapted the form to support both creation and editing workflows.
- Kept the abstraction focused on the repeated form logic instead of introducing a more complex form architecture.

## Outcome

This decision reduced duplicated code and helped keep the create and edit flows visually and functionally consistent.

Both screens used the same fields and validation rules, making a shared component a natural fit for the challenge scope.

The main motivation for this change came from previous experience building similar CRUD flows in other projects, where maintaining multiple versions of the same form usually leads to duplicated effort and inconsistencies over time.

The final implementation provided a simpler and more maintainable solution without introducing unnecessary complexity.
