# SmartFlow AI - Project Requirements Document

## 1. Functional Requirements

### 1.1 User & Identity Management (`user-service`)
- **FR-1.1**: Support user registration with full name, email, password, role, and team.
- **FR-1.2**: Implement JWT (JSON Web Token) authentication and login verification.
- **FR-1.3**: Support role-based access control for `ADMIN`, `PROJECT_MANAGER`, `TEAM_LEAD`, `DEVELOPER`, `TESTER`.
- **FR-1.4**: Enforce email uniqueness and BCrypt password encryption.

### 1.2 Project Lifecycle Management (`project-service`)
- **FR-2.1**: Support CRUD operations for projects (create, read, update, delete).
- **FR-2.2**: Support status tracking: `PLANNED`, `IN_PROGRESS`, `COMPLETED`, `ON_HOLD`.
- **FR-2.3**: Support priority levels: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`.
- **FR-2.4**: Store client details, project timeline (start/end dates), and creation timestamps.

### 1.3 Agile JIRA-Style Task Management (`task-service`)
- **FR-3.1**: Support story creation with title, description, story type (`STORY`, `BUG`, `TASK`), status (`TODO`, `IN_PROGRESS`, `CODE_REVIEW`, `TESTING`, `DONE`, `BLOCKED`), priority, story points, and assignee.
- **FR-3.2**: OpenFeign integration with `user-service` to retrieve developer assignee names dynamically.
- **FR-3.3**: Support project-specific task queries (`/api/tasks/project/{projectId}`).

### 1.4 Risk Intelligence Engine (`risk-service`)
- **FR-4.1**: Support risk recording with probability (`LOW`, `MEDIUM`, `HIGH`) and impact (`LOW`, `MEDIUM`, `HIGH`).
- **FR-4.2**: Automated risk severity calculation in service layer:
  - `HIGH + HIGH = CRITICAL`
  - `HIGH + MEDIUM / MEDIUM + HIGH = HIGH`
  - `HIGH + LOW / MEDIUM + MEDIUM / LOW + HIGH = MEDIUM`
  - `LOW + LOW = LOW`
- **FR-4.3**: Support mitigation plan tracking and risk status (`OPEN`, `MITIGATED`, `CLOSED`).

### 1.5 Rule-Based AI Project Intelligence (`ai-insights-service`)
- **FR-5.1**: Evaluate project health dynamically using OpenFeign calls to project, task, and risk microservices.
- **FR-5.2**: Generate risk levels (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`), diagnostic findings, actionable recommendations, and completion percentages.

### 1.6 Angular SaaS Dashboard (`angular-frontend`)
- **FR-6.1**: Provide a responsive dark-themed SaaS UI with KPI cards, Kanban task board, risk matrix, team view, AI intelligence view, and CSV report export.

---

## 2. Non-Functional Requirements
- **NFR-1 (Maintainability)**: Clean layered architecture (`Controller` -> `Service` -> `Repository` -> `Entity`).
- **NFR-2 (Scalability)**: Decoupled microservices architecture registered with Netflix Eureka Service Discovery.
- **NFR-3 (Performance)**: Centralized routing via Spring Cloud Gateway (`:8080`) with CORS support.
- **NFR-4 (Security)**: Password hashing with BCrypt and stateless JWT token authentication.
- **NFR-5 (Resilience & Fallback)**: OpenFeign graceful fallbacks for missing inter-service data.
- **NFR-6 (Persistence)**: Relational storage in MySQL 8.0 databases.
