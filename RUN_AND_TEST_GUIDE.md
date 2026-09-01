# SmartFlow AI - Startup & Testing Guide

Follow these sequential steps to start, run, and test the full SmartFlow AI platform on Windows.

---

## 1. Prerequisites Verification
Ensure Java 17, Maven 3.9+, Node.js 20+, and MySQL 8.0 are installed.

Set environment variables in PowerShell:
```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"
$env:Path += ";C:\Program Files\Apache\Maven\apache-maven-3.9.9\bin"
```

Verify MySQL service is running:
```powershell
Get-Service -Name "MySQL80"
```

---

## 2. Maven Build & Package
From the root directory `g:\smartflow-ai-platform`:

```powershell
# Clean compile parent project and all submodules
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"; & "C:\Program Files\Apache\Maven\apache-maven-3.9.9\bin\mvn.cmd" clean compile

# Run JUnit 5 / Mockito unit tests across all microservices
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"; & "C:\Program Files\Apache\Maven\apache-maven-3.9.9\bin\mvn.cmd" test

# Build executable JAR packages
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"; & "C:\Program Files\Apache\Maven\apache-maven-3.9.9\bin\mvn.cmd" package -DskipTests
```

---

## 3. Sequential Microservices Startup Order

Start each microservice in a separate terminal window:

### Step 1: Service Registry (Eureka Server - Port 8761)
```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"; & "C:\Program Files\Java\jdk-17\bin\java.exe" -jar service-registry/target/service-registry-0.0.1-SNAPSHOT.jar
```
*Verify Eureka Dashboard*: Open `http://localhost:8761` in browser.

### Step 2: API Gateway (Port 8080)
```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"; & "C:\Program Files\Java\jdk-17\bin\java.exe" -jar api-gateway/target/api-gateway-0.0.1-SNAPSHOT.jar
```

### Step 3: User Service (Port 8081)
```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"; & "C:\Program Files\Java\jdk-17\bin\java.exe" -jar user-service/target/user-service-0.0.1-SNAPSHOT.jar
```

### Step 4: Project Service (Port 8082)
```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"; & "C:\Program Files\Java\jdk-17\bin\java.exe" -jar project-service/target/project-service-0.0.1-SNAPSHOT.jar
```

### Step 5: Task Service (Port 8083)
```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"; & "C:\Program Files\Java\jdk-17\bin\java.exe" -jar task-service/target/task-service-0.0.1-SNAPSHOT.jar
```

### Step 6: Risk Service (Port 8084)
```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"; & "C:\Program Files\Java\jdk-17\bin\java.exe" -jar risk-service/target/risk-service-0.0.1-SNAPSHOT.jar
```

### Step 7: AI Insights Service (Port 8085)
```powershell
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"; & "C:\Program Files\Java\jdk-17\bin\java.exe" -jar ai-insights-service/target/ai-insights-service-0.0.1-SNAPSHOT.jar
```

### Step 8: Angular Frontend (Port 4200)
```powershell
cd angular-frontend
npm start
```
*Open Browser*: `http://localhost:4200`

---

## 4. End-to-End Workflow Validation
1. Register a new user (`/register`) -> Sign in (`/login`).
2. Create project "Smart Banking Platform" (`/projects`).
3. Create Agile tasks on Kanban board (`/tasks`).
4. Log risks with High Probability & High Impact (`/risks`).
5. Open AI Intelligence View (`/ai-insights`) to view automated risk evaluation.
6. Export CSV Reports (`/reports`).
