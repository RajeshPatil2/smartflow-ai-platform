# SmartFlow AI - REST API Documentation

All APIs are routed through the Spring Cloud API Gateway at `http://localhost:8080`.

---

## 1. User & Auth Service (`/api/users`)

### 1.1 Register New User
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/users/register`
- **Request Body**:
```json
{
  "name": "Rajesh Patil",
  "email": "rajesh@example.com",
  "password": "password123",
  "role": "DEVELOPER",
  "team": "Backend Team"
}
```
- **Response**: `201 CREATED`
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "name": "Rajesh Patil",
    "email": "rajesh@example.com",
    "role": "DEVELOPER",
    "team": "Backend Team",
    "createdAt": "2026-08-31T12:00:00"
  }
}
```

### 1.2 User Login
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/users/login`
- **Request Body**:
```json
{
  "email": "rajesh@example.com",
  "password": "password123"
}
```
- **Response**: `200 OK` (Returns JWT token and user info)

### 1.3 List All Users
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/users`
- **Response**: `200 OK` (Array of User objects)

---

## 2. Project Service (`/api/projects`)

### 2.1 Create Project
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/projects`
- **Request Body**:
```json
{
  "projectName": "Smart Banking Platform",
  "description": "Enterprise mobile and web banking core",
  "clientName": "ABC Technologies",
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}
```
- **Response**: `201 CREATED`

### 2.2 Get All Projects
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/projects`

### 2.3 Get Project By ID
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/projects/{id}`

---

## 3. Task Service (`/api/tasks`)

### 3.1 Create Task
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/tasks`
- **Request Body**:
```json
{
  "projectId": 1,
  "title": "Implement User Registration API",
  "description": "Create REST endpoint for registering new users",
  "storyType": "STORY",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "assigneeId": 1,
  "storyPoints": 5
}
```
- **Response**: `201 CREATED`

### 3.2 Get Tasks By Project
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/tasks/project/{projectId}`

---

## 4. Risk Service (`/api/risks`)

### 4.1 Log Risk
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/risks`
- **Request Body**:
```json
{
  "projectId": 1,
  "title": "Payment API Integration Delay",
  "description": "Third-party payment vendor sandbox downtime",
  "probability": "HIGH",
  "impact": "HIGH",
  "status": "OPEN",
  "mitigationPlan": "Use mock payment gateway fallback"
}
```
- **Response**: `201 CREATED` (Severity calculated automatically as `CRITICAL`)

---

## 5. AI Insights Service (`/api/ai`)

### 5.1 Get Project Insight
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/ai/insights/project/{projectId}`
- **Response**: `200 OK`
```json
{
  "projectId": 1,
  "projectName": "Smart Banking Platform",
  "riskLevel": "CRITICAL",
  "message": "Critical blockages detected! Project has 1 unmitigated critical risks and 2 blocked tasks.",
  "recommendation": "Immediate executive escalation needed. Conduct daily sync to unblock critical path tasks.",
  "totalTasks": 4,
  "blockedTasks": 2,
  "openRisks": 1,
  "criticalRisks": 1,
  "completionPercentage": 25.0,
  "actionablePoints": [
    "Assign lead senior engineer to resolve blocked task dependencies.",
    "Review critical risk mitigation plan with client stakeholders."
  ]
}
```
