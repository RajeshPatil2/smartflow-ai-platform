# SmartFlow AI - UI & Architectural Design System

## Visual Design Aesthetics
- **Theme**: Premium Enterprise SaaS Dark Mode.
- **Color Palette**:
  - Background Base: `#0f172a` (Slate 900)
  - Surface Containers: `#1e293b` (Slate 800)
  - Border Accents: `#334155` (Slate 700)
  - Primary Accent (AI & Actions): `#6366f1` (Indigo 500) to `#8b5cf6` (Purple 500) gradient
  - Success Indicator: `#10b981` (Emerald 500)
  - Warning / Medium Risk: `#f59e0b` (Amber 500)
  - Critical Risk / High Priority: `#ef4444` (Red 500)
  - Info / Secondary: `#06b6d4` (Cyan 500)
  - Text Primary: `#f8fafc` (Slate 50)
  - Text Muted: `#94a3b8` (Slate 400)

## Microservice Architecture & Port Allocations
```text
                          Angular Frontend (:4200)
                                    |
                                    v
                            API Gateway (:8080)
                                    |
     +-----------------+------------+------------+-----------------+
     |                 |                         |                 |
     v                 v                         v                 v
User Service     Project Service           Task Service       Risk Service
   (:8081)           (:8082)                   (:8083)           (:8084)
     |                 |                         |                 |
     v                 v                         v                 v
smartflow_     smartflow_                smartflow_        smartflow_
user_db        project_db                task_db           risk_db
                                                                   ^
                                                                   |
                                                         AI Insights Service
                                                               (:8085)
                                                       (Rule Intelligence Engine)
```
- **Service Registry (Eureka)**: `http://localhost:8761`
