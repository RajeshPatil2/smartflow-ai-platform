import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { DashboardComponent } from './components/dashboard.component';
import { ProjectsComponent } from './components/projects.component';
import { TasksComponent } from './components/tasks.component';
import { RisksComponent } from './components/risks.component';
import { AiInsightsComponent } from './components/ai-insights.component';
import { UsersComponent } from './components/users.component';
import { ReportsComponent } from './components/reports.component';
import { NotificationsComponent } from './components/notifications.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'risks', component: RisksComponent },
  { path: 'ai-insights', component: AiInsightsComponent },
  { path: 'team', component: UsersComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];
