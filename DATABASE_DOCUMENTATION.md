# SmartFlow AI - Database Architecture & Documentation

## Database Topology & Microservice Ownership

| Microservice | Port | MySQL Database Name | Table Name | Key Schema Fields |
|---|---|---|---|---|
| `user-service` | 8081 | `smartflow_user_db` | `users` | `id`, `name`, `email`, `password`, `role`, `team`, `created_at` |
| `project-service` | 8082 | `smartflow_project_db` | `projects` | `id`, `project_name`, `description`, `client_name`, `status`, `priority`, `start_date`, `end_date`, `created_at` |
| `task-service` | 8083 | `smartflow_task_db` | `tasks` | `id`, `project_id`, `title`, `description`, `story_type`, `status`, `priority`, `assignee_id`, `story_points`, `created_at`, `updated_at` |
| `risk-service` | 8084 | `smartflow_risk_db` | `risks` | `id`, `project_id`, `title`, `description`, `probability`, `impact`, `severity`, `status`, `mitigation_plan`, `created_at` |

---

## MySQL Database Verification Commands

Execute the following commands in MySQL Workbench or MySQL CLI:

```sql
-- 1. Show all databases created by SmartFlow AI microservices
SHOW DATABASES LIKE 'smartflow_%';

-- 2. Inspect User Database
USE smartflow_user_db;
SHOW TABLES;
SELECT id, name, email, role, team, created_at FROM users;

-- 3. Inspect Project Database
USE smartflow_project_db;
SHOW TABLES;
SELECT id, project_name, client_name, status, priority FROM projects;

-- 4. Inspect Task Database
USE smartflow_task_db;
SHOW TABLES;
SELECT id, project_id, title, story_type, status, priority, story_points FROM tasks;

-- 5. Inspect Risk Database
USE smartflow_risk_db;
SHOW TABLES;
SELECT id, project_id, title, probability, impact, severity, status FROM risks;
```
