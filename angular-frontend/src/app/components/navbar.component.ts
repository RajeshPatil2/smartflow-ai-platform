import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from '../models/models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="brand-header">
        <div class="brand-logo">SF</div>
        <div class="brand-title">SmartFlow AI</div>
      </div>
      <ul class="nav-links">
        <li class="nav-item">
          <a routerLink="/dashboard" routerLinkActive="active">📊 Dashboard</a>
        </li>
        <li class="nav-item">
          <a routerLink="/projects" routerLinkActive="active">📁 Projects</a>
        </li>
        <li class="nav-item">
          <a routerLink="/tasks" routerLinkActive="active">📌 Task Board (JIRA)</a>
        </li>
        <li class="nav-item">
          <a routerLink="/risks" routerLinkActive="active">⚠️ Risk Matrix</a>
        </li>
        <li class="nav-item">
          <a routerLink="/ai-insights" routerLinkActive="active">🤖 AI Intelligence</a>
        </li>
        <li class="nav-item">
          <a routerLink="/team" routerLinkActive="active">👥 Team Members</a>
        </li>
        <li class="nav-item">
          <a routerLink="/reports" routerLinkActive="active">📈 Reports & Export</a>
        </li>
        <li class="nav-item">
          <a routerLink="/notifications" routerLinkActive="active">🔔 Notifications</a>
        </li>
      </ul>
    </aside>
  `
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
