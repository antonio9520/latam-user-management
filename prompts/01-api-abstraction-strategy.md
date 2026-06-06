# API Abstraction Strategy

## Goal

Improve the application's data layer and make the CRUD behavior closer to a real-world backend while keeping the solution aligned with the challenge scope.

## Prompt

I want to replace DummyJSON with json-server.

My reasons are:

- persistent CRUD operations
- full control over the data
- cleaner and more predictable data structures

I also want to add a repository layer to decouple the application from the data source.

Review this approach and identify any risks, drawbacks, or improvements before I implement it.

## Accepted

- Migration from DummyJSON to json-server.
- Persistent CRUD operations.
- Consistent and fully controlled data structures.
- Repository abstraction between the application and the data source.
- Separation between application logic and data access.

## Discarded

- Continuing to use DummyJSON as the primary data source.
- Computed data structures that did not accurately represent real backend behavior.
- Tight coupling between application logic and the data source implementation.

## Modified

- Replaced the original DummyJSON integration with a local json-server database.
- Added a repository layer even though it was not strictly required for the challenge.
- Prioritized data consistency and maintainability over the simplest possible implementation.

## Outcome

After implementing part of the CRUD functionality, limitations in the original DummyJSON integration became apparent. The data structure contained computed values, lacked persistence, and provided less control over the dataset used by the application.

To address these issues, the project was migrated to json-server. This provided consistent data, persistent CRUD operations, complete control over the dataset, and behavior that more closely resembled a real backend API.

A repository abstraction layer was also introduced. While not strictly required for the challenge, it was intentionally added to isolate the application from the data source and simplify future migrations.

The most significant improvement was the migration to json-server itself, as it created a more predictable development environment, improved data quality, and resulted in behavior that more closely reflected a production-style application.
