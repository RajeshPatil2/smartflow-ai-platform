# SmartFlow AI - Project Rules & Guidelines

## Architecture & Code Principles
1. **Microservices Isolation**: Each microservice manages its own database. No direct cross-database queries or shared databases between services.
2. **Inter-Service Communication**: Use OpenFeign clients through Eureka service discovery for service-to-service calls.
3. **Gateway Routing**: All external client requests (Angular UI / Postman) MUST pass through `api-gateway` on port `8080`.
4. **Layered Architecture**: Every Spring Boot microservice must strictly follow:
   - `Controller` -> handles HTTP endpoints, request/response validation, delegation. No raw business logic in controllers.
   - `Service` -> contains business logic, transactional boundaries, validation rules.
   - `Repository` -> Spring Data JPA interface.
   - `Entity` -> JPA entity mapping with validation annotations.
   - `DTO` -> Request and response payloads.
5. **Exception Handling**: Standardized exception handling via `@RestControllerAdvice` returning structured error payloads.
6. **Code Style**:
   - Constructor injection preferred over field injection (`@Autowired` on fields avoided).
   - Descriptive method and variable naming.
   - Standard Java 17 features.
7. **Frontend Design**:
   - Modern, high-contrast dark enterprise SaaS aesthetic.
   - Responsive layouts (flexbox/grid).
   - Dynamic charts, stats counters, Kanban board columns, and real-time risk indicators.
