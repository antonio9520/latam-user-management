# Architecture and State Management

## Goal

Select an Angular architecture and state management approach that balanced simplicity, maintainability, and delivery speed for the challenge scope.

## Prompt

This is my first Angular project.

I need help deciding how to structure the application and manage state.

Please compare:

- NgRx
- Angular Signals
- Service-based stores

Consider:

- implementation speed
- learning curve
- maintainability
- scalability
- challenge scope

I want the simplest solution that can satisfy the challenge requirements without introducing unnecessary complexity.

## Accepted

- Feature-based architecture.
- Standalone Components.
- Angular Signals for state management.
- Dedicated service layer.
- Signals for both UI state and application data.
- A lightweight architecture focused on delivering the challenge requirements efficiently.

## Discarded

- NgRx, due to its additional complexity and boilerplate for a project of this size.
- More advanced architectural approaches that would increase implementation time without providing significant value for the challenge scope.
- Additional abstractions that were not required by the project requirements.

## Modified

- Adapted the proposed architecture to match the available delivery time.
- Prioritized simplicity and maintainability over architectural completeness.
- Evaluated each recommendation from the perspective of a first Angular project rather than adopting patterns solely because they were available.

## Outcome

This session established the technical foundation of the project.

Since I had no prior Angular experience, one of the main objectives was understanding which architectural decisions were essential and which would introduce unnecessary complexity.

After comparing multiple state management approaches, Angular Signals were selected because they provided the best balance between simplicity, learning effort, implementation speed, and project requirements.

NgRx was evaluated but ultimately rejected because its complexity was not justified for the challenge scope.

The resulting architecture remained intentionally lightweight, allowing the project to be delivered within the available timeframe while maintaining a clear separation of responsibilities and a structure that could evolve if the application grew in size.
