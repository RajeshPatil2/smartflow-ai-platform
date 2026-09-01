# SmartFlow AI - Agile & JIRA Workflow Guide

## Agile Hierarchy

```text
Epic / Feature
  ↓
User Story (STORY) / Bug (BUG) / Task (TASK)
  ↓
Sprint Backlog Allocation
  ↓
Kanban Status Transition:
  [TODO] ──> [IN_PROGRESS] ──> [CODE_REVIEW] ──> [TESTING] ──> [DONE]
                                     │
                                     └──> [BLOCKED]
```

## Agile Status Flow Definitions

1. **TODO**: Backlog user stories ready for upcoming sprint allocation.
2. **IN_PROGRESS**: Active development currently underway by assigned developer.
3. **CODE_REVIEW**: Feature complete; pull request submitted for peer review.
4. **TESTING**: Deployed to QA environment for test case verification.
5. **DONE**: Definition of Done (DoD) met; passes all unit and integration tests.
6. **BLOCKED**: Progress halted due to external dependency, API delay, or blocker risk.

## Story Point Estimation Scale
- **1 - 2 Points**: T-shirt size Small (trivial bug fix, text change, simple endpoint).
- **3 - 5 Points**: Medium complexity (REST API CRUD, validation logic, entity mapping).
- **8 - 13 Points**: Complex feature (Inter-service OpenFeign integration, security setup, risk severity engine).
