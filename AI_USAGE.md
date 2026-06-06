# AI Usage Report

## Tools Used

### Claude Sonnet 4.6

Angular architecture design.
State management evaluation and implementation.
Feature organization.
Complex component development.
Code reviews and refactoring.
Implementation of unit tests.

### ChatGPT (GPT-5.5)

Challenge requirement analysis.
Architecture trade-off discussions.
Large-scale code audits.
Accessibility reviews.
Documentation support.
README and AI_USAGE reviews.
Technical decision validation.

### GitHub Copilot (GPT-5 mini)

Component scaffolding.
Boilerplate generation.
Angular Material setup.
Template generation.
Small UI improvements.
Repetitive TypeScript code.
Minor refactors and cleanup tasks.

---

## Estimated AI Contribution

| Área             | IA  | Humano |
| ---------------- | --- | ------ |
| Architecture     | 45% | 55%    |
| State Management | 44% | 55%    |
| Components       | 75% | 25%    |
| Services         | 60% | 40%    |
| Testing          | 65% | 35%    |
| Documentation    | 55% | 45%    |

### Notes

These percentages represent how much AI accelerated or influenced each area during development, not ownership of the final solution.

All architectural decisions, code reviews, debugging, QA activities and final acceptance decisions remained my responsibility.

---

## Where AI Helped Most

### Example 1 — Angular Architecture Learning

#### Context

This was my first project built with Angular.

My previous professional experience was primarily focused on React, React Native, Next.js and TypeScript, so I was already familiar with concepts such as component-based architecture, state management, dependency injection patterns, routing and API consumption, but I needed to understand how these concepts were implemented within Angular.

The main challenge was not writing TypeScript code itself, but understanding Angular-specific concepts such as Signals, Dependency Injection, Standalone Components, Reactive Forms, feature organization and Angular's recommended architectural patterns.

#### AI Contribution

AI acted as a learning and research assistant throughout the project.

It helped me:

- Compare Angular concepts with their React equivalents.
- Understand the role of Signals compared to React state management solutions.
- Learn Angular Dependency Injection patterns.
- Understand Standalone Components and modern Angular application structure.
- Evaluate different state management approaches.
- Review Angular best practices and conventions.

Rather than generating complete solutions, most interactions focused on understanding concepts, evaluating trade-offs and validating implementation decisions.

#### Final Outcome

The final architecture was implemented using a feature-based structure, Angular Signals for state management, Angular Material for UI components and a dedicated service layer for API communication.

AI accelerated the learning process significantly and helped reduce the time required to become productive with Angular, but the final architectural decisions, implementation details and code reviews remained my responsibility.

---

### Example 2 — State Management

#### Context

One of the first architectural decisions in the project was selecting a state management approach for the users domain.

Although Angular provides several alternatives such as NgRx, NgRx Signals, Akita and service-based stores, the challenge requirements only involved a single domain with relatively simple CRUD operations and UI state management.

As this was my first Angular project, I also needed to understand the trade-offs between the available solutions and determine which approach provided the best balance between maintainability and complexity.

#### AI Contribution

AI helped compare multiple state management approaches and explain their advantages, disadvantages and common use cases.

The discussions focused on:

- NgRx versus Angular Signals.
- Complexity versus maintainability.
- Scalability considerations.
- Recommended patterns for small and medium-sized applications.
- Signal-based state management best practices.

AI also helped review the initial store implementation and suggested improvements around state organization, computed values and loading/error handling.

#### Final Outcome

After evaluating the alternatives, I decided to implement a service-based store using Angular Signals.

The selected approach provided a simpler mental model, significantly less boilerplate than NgRx and enough scalability for the scope of the challenge.

The final implementation included centralized state management for users, loading states, error handling and derived state through computed signals.

AI helped accelerate the evaluation process and provided implementation guidance, while the final decision and resulting architecture were selected and reviewed by me.

---

### Example 3 — Building the First Functional Version

#### Context

Since this was my first Angular project, the initial challenge was not solving the business requirements themselves, but becoming productive with an unfamiliar framework within a limited timeframe.

Starting from a blank project would have required spending significant time learning Angular fundamentals before being able to validate ideas and iterate on the application.

To accelerate the learning process, I focused on obtaining a working end-to-end version of the application as early as possible.

#### AI Contribution

AI was heavily involved in producing the first functional version of the application.

This included:

- Initial project structure.
- Feature scaffolding.
- Angular component generation.
- Service layer setup.
- Routing configuration.
- Reactive forms setup.
- Angular Material integration.
- Initial CRUD implementation.

The goal was not to obtain production-ready code immediately, but rather to create a functional baseline that could be reviewed, tested and improved.

#### Final Outcome

The first version allowed me to quickly understand how Angular applications are structured and how the different pieces interact.

Once a functional baseline existed, I iteratively reviewed the implementation, refactored the generated code, simplified unnecessary complexity, improved naming conventions, adjusted architectural decisions and optimized the overall structure of the application.

This approach significantly reduced the learning curve and allowed me to focus on understanding the framework while still maintaining ownership of the final implementation.

## References

[Listing Users ](https://github.com/antonio9520/latam-user-management/commit/e959226e851cfdf15719b3fb652d0b741c5784c4)
[Creation Users](https://github.com/antonio9520/latam-user-management/commit/e19a00306db7203367c112be664b6e4cd32e554f)
[Edit Users](https://github.com/antonio9520/latam-user-management/commit/53014cf6b129337cab8d492066fe5c6f59de88bb)
[Delete Users](https://github.com/antonio9520/latam-user-management/commit/e416227dd2ac8da4c1caeb5c488cacb2c30c2501)

---

## Where AI Got It Wrong

### Example 1 — Deprecated Angular Animations Setup

#### Problem

During the initial application setup, AI suggested adding Angular animations support and generated the required configuration to enable it.

The recommendation included installing the `@angular/animations` package and configuring animation-related APIs within the application bootstrap process.

#### Why It Was Incorrect

After reviewing the generated solution, I discovered that some of the recommended animation APIs were already deprecated in the Angular version used by the project.

Additionally, the application did not require animations for any of its features, meaning the dependency and configuration introduced unnecessary complexity without providing any real value.

The recommendation solved a problem that did not actually exist in the project.

#### Resolution

I removed both the dependency and the related configuration.

After validating the application, everything continued to work correctly without Angular animations.

---

### Example 2 — Incorrect API Response Assumption

#### Problem

AI assumed a response structure that did not match the actual API implementation.

The generated code expected data to be available directly on the response object, while the API returned the payload under a `data` property.

#### Why It Was Incorrect

The mismatch caused typing issues and incorrect data mapping within the service layer.

The generated implementation did not accurately reflect the real API contract.

#### Resolution

I inspected the actual API responses, updated the response types and adjusted the mapping layer to correctly handle the response structure.

This ensured type safety and consistent data handling throughout the application.

---

### Example 3 — Incorrect API Filtering Strategy

#### Problem

AI suggested implementing role, status and search filtering directly through query parameters in the mock API.

The assumption was that the selected json-server setup supported all filtering operations server-side.

#### Why It Was Incorrect

After implementation and testing, I discovered that the configured json-server version did not support the expected filtering behavior.

Role and status filtering were not applied correctly and search functionality did not behave as intended.

The generated solution relied on capabilities that were not actually available in the chosen setup.

#### Resolution

I reviewed the API behavior, identified the limitation and implemented filtering logic on the client side where necessary.

This ensured that search and filtering worked consistently regardless of backend limitations.

---

## Decisions Made Without AI

### Decision 1 — json-server instead of DummyJSON

#### Decision

I chose to use `json-server` instead of consuming DummyJSON directly.

#### Reasoning

DummyJSON was the recommended API because its user schema is close to the challenge requirements. However, its simulated CRUD operations do not persist changes.

For this challenge, I wanted the application to behave closer to a real user management system during local execution.

Using `json-server` allowed me to:

- Control the exact user schema.
- Persist created, updated and deleted users during local development.
- Include required fields such as `createdAt`, `updatedAt` and `active`.
- Avoid excessive client-side mocking for missing fields.
- Provide a more predictable local development experience.

This decision made the project easier to test, demo and review from a fresh clone.

---

### Decision 2 — Signals-Based Store

#### Decision

I chose a service-based store using Angular Signals instead of NgRx.

#### Reasoning

The project only had one main domain: users.

Using NgRx would have added extra boilerplate and complexity for a relatively small CRUD application.

Angular Signals provided enough structure to manage:

- Users state.
- Loading states.
- Error states.
- Selected user.
- Derived values.

This made the implementation easier to understand, maintain and explain during a technical review.

---

### Decision 3 — Shared User Form for Create and Edit

#### Decision

I implemented a shared user form component for both user creation and user editing.

#### Reasoning

The create and edit flows share most of the same fields, validations and UI behavior.

Duplicating the form in separate components would increase maintenance cost and create a higher risk of inconsistent validation rules.

A shared form allowed me to:

- Reuse validation logic.
- Keep field-level error handling consistent.
- Maintain a single source of truth for the form UI.
- Reduce duplicated template code.
- Make future changes easier.

The parent pages are responsible for deciding whether the form is used in create or edit mode.

---

### Decision 4 — Client-Side Repository Pattern

#### Decision

I used a repository-style abstraction for user API access on the client side.

#### Reasoning

The challenge required all HTTP calls to go through a typed service layer and explicitly avoided direct HTTP calls inside components.

The repository-style abstraction helped separate:

- API communication.
- Data mapping.
- Domain-facing operations.
- Component and store logic.

This made the code easier to test and reduced coupling between Angular components and the backend response shape.

It also made it easier to adapt the application when using `json-server`, because API-specific details remained isolated from the rest of the users feature.

---

## Prompting Strategy

### Approach

Since I had no prior Angular experience, my workflow started with understanding the challenge requirements and learning the fundamentals of the framework before focusing on implementation.

My typical process was:

1. Review and understand the challenge requirements.
2. Use AI to summarize and structure the problem.
3. Learn the Angular concepts required for the task.
4. Discuss architecture and implementation alternatives.
5. Generate audit prompts to evaluate the current solution.
6. Review findings and identify improvements or risks.
7. Generate implementation prompts.
8. Implement the solution using AI-assisted code generation.
9. Perform functional QA and code review.
10. Refactor or adjust the solution when necessary.

Rather than asking AI to build the entire project in a single step, I worked through many small iterations focused on specific features, architectural decisions and quality improvements.

One of the most valuable workflows during the challenge was using AI for audits before implementation. This allowed me to identify potential issues, missing requirements and architectural improvements before writing or generating code.

---

### Typical Prompt Structure

I commonly used two different prompt types throughout the project.

#### Audit Prompts

Used before implementation to:

- Review architecture decisions.
- Evaluate folder structure and project organization.
- Identify missing challenge requirements.
- Detect potential implementation risks.
- Validate state management choices.
- Review maintainability and scalability concerns.
- Identify opportunities for refactoring.

#### Implementation Prompts

Generated after the audit phase and focused on:

- Feature implementation.
- Component generation.
- Service layer implementation.
- Refactoring.
- Testing.
- Documentation.

In many cases, implementation prompts were generated from the findings of a previous audit prompt.

My workflow typically started with a small prompt describing the problem. I then used AI to expand that prompt into a more detailed implementation plan that included:

- Challenge requirements.
- Existing project structure.
- Folder organization.
- Relevant files.
- Technical constraints.
- Expected behavior.
- Architectural considerations.

This approach produced more accurate implementations and reduced the number of iterations required.

---

### Review Process

The first functional version of the application was heavily AI-assisted.

Approximately 90% of the initial MVP implementation was generated through AI-assisted development.

The objective of this approach was to quickly obtain a working Angular application and reduce the learning curve associated with an unfamiliar framework.

However, generated code was never accepted without review.

After each implementation, I typically:

- Executed the feature and validated the behavior.
- Performed user-level QA.
- Reviewed the generated code component by component.
- Verified the implementation against challenge requirements.
- Compared generated solutions with Angular best practices.
- Refactored code when necessary.
- Fixed issues either manually or through additional AI-assisted iterations.

The final implementation was the result of multiple review, audit and refinement cycles rather than a direct acceptance of generated code.

---

### When I Preferred Manual Implementation

I generally preferred manual implementation when:

- The fix was small and faster to implement directly.
- UI adjustments required precise visual changes.
- CSS or layout changes were straightforward.
- Generated solutions introduced unnecessary complexity.
- I already had a clear understanding of the required solution.
- Refactoring was simpler than generating a new implementation.

I also rejected some AI recommendations entirely.

One example was the recommendation to use DummyJSON as the primary data source. Although it was the recommended API in the challenge, I decided to use json-server instead because it provided full control over the data structure, local persistence and a more predictable development environment for CRUD operations.

This decision allowed the application to behave more like a real user management system while simplifying testing, debugging and local development.

---

### Future Improvements

If I had additional time, I would focus on:

- Increasing unit test coverage.
- Adding end-to-end tests.
- Solve the implementation of internationalization support.
- Adding Storybook for reusable UI components.
- Implementing optimistic UI updates for CRUD operations.
- Further refining the design system and component library.

Although the challenge requirements were met, these improvements would help move the project closer to production-ready standards.
