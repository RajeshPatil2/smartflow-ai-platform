# SmartFlow AI – Project & Risk Intelligence Platform

**SmartFlow AI** is an enterprise-grade full-stack SaaS project management and risk intelligence platform built with **Java 17**, **Spring Boot 3**, **Spring Cloud (Eureka, API Gateway, OpenFeign)**, **MySQL 8.0**, and **Angular**.

---

## 🏗️ Architecture Overview

```text
                         Angular UI (:4200)
                                 |
                                 v
                         API Gateway :8080
                                 |
        +--------------------+---+----------------+------------------+
        |                    |                    |                  |
        v                    v                    v                  v
   User Service       Project Service        Task Service       Risk Service
      :8081                :8082                :8083              :8084
        |                    |                    |                  |
        v                    v                    v                  v
  MySQL (user_db)     MySQL (project_db)   MySQL (task_db)    MySQL (risk_db)
                                                                     ^
                                                                     |
                                                           AI Insights Service
                                                                 :8085
                                                         (Rule Engine Intelligence)
```

---

## 🚀 Key Microservices & Component Specifications

| Service Module | Port | MySQL Database | Key Responsibilities |
|---|---|---|---|
| `service-registry` | `8761` | N/A | Eureka Service Discovery Server |
| `api-gateway` | `8080` | N/A | Spring Cloud Gateway routing & CORS control |
| `user-service` | `8081` | `smartflow_user_db` | JWT Authentication, BCrypt password security, Roles (`ADMIN`, `PROJECT_MANAGER`, `TEAM_LEAD`, `DEVELOPER`, `TESTER`) |
| `project-service` | `8082` | `smartflow_project_db` | Project lifecycle, timelines, client management, status & priority tracking |
| `task-service` | `8083` | `smartflow_task_db` | Agile JIRA-style Kanban workflow, story types, OpenFeign calls to `user-service` |
| `risk-service` | `8084` | `smartflow_risk_db` | Risk tracking, automated severity engine (`HIGH+HIGH=CRITICAL`), OpenFeign to `project-service` |
| `ai-insights-service` | `8085` | Stateless / Audit | Rule-based AI project intelligence engine analyzing blockages, deadlines, and risk densities |
| `angular-frontend` | `4200` | N/A | Dark enterprise SaaS dashboard UI with Kanban board, Risk Matrix, AI reports, CSV exports |

---

## 🛠️ Technology Stack

- **Backend Framework**: Java 17, Spring Boot 3.2.5, Spring MVC, Spring Data JPA, Hibernate
- **Microservices Infrastructure**: Spring Cloud 2023.0.1 (Eureka Server/Client, Spring Cloud Gateway, OpenFeign)
- **Security**: Spring Security, BCrypt Password Encoder, JJWT 0.11.5
- **Database**: MySQL 8.0 Server
- **Frontend Framework**: Angular 17, TypeScript 5.4, HTML5, Vanilla CSS Enterprise Dark Theme
- **Testing**: JUnit 5, Mockito

---

## 📋 Comprehensive Documentation Index

- [PROJECT_REQUIREMENTS.md](PROJECT_REQUIREMENTS.md) - Detailed functional and non-functional specifications.
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Complete REST API request/response payloads.
- [DATABASE_DOCUMENTATION.md](DATABASE_DOCUMENTATION.md) - MySQL database schema, ownership, and verification queries.
- [JIRA_AGILE_WORKFLOW.md](JIRA_AGILE_WORKFLOW.md) - Agile sprint methodology, story point scale, and Kanban transitions.
- [ERRORS_AND_SOLUTIONS.md](ERRORS_AND_SOLUTIONS.md) - Actual runtime diagnostic and resolution log.
- [RUN_AND_TEST_GUIDE.md](RUN_AND_TEST_GUIDE.md) - Step-by-step Windows execution and Maven command guide.
- [rules.md](rules.md) - Project architectural rules.
- [phases.doc.md](phases.doc.md) - Milestone tracking.
- [design.md](design.md) - UI design system tokens.
- [memory.md](memory.md) - Project state memory ledger.

---

## ⚙️ How to Build and Run

### 1. Build Maven Backend
```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"; & "C:\Program Files\Apache\Maven\apache-maven-3.9.9\bin\mvn.cmd" clean package -DskipTests
```

### 2. Run Eureka & Gateway
Start `service-registry` on `:8761`, then `api-gateway` on `:8080`.

### 3. Run Microservices
Start `user-service` (:8081), `project-service` (:8082), `task-service` (:8083), `risk-service` (:8084), `ai-insights-service` (:8085).

### 4. Run Angular UI
```powershell
cd angular-frontend
npm start
```
Access UI at `http://localhost:4200`.
