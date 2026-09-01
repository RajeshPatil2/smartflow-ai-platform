import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { ApiService } from './services/api.service';
import { User } from './models/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <div *ngIf="isAuthPage(); else mainLayout">
      <router-outlet></router-outlet>
    </div>

    <ng-template #mainLayout>
      <div class="app-container">
        <app-navbar></app-navbar>

        <main class="main-content">
          <header class="top-bar">
            <h1 class="page-title">SmartFlow AI Workspace</h1>
            <div class="top-actions">
              <div class="user-badge" *ngIf="currentUser">
                <div class="avatar">{{ getUserInitial() }}</div>
                <div>
                  <div style="font-weight: 600; color: #fff;">{{ currentUser.name }}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">{{ currentUser.role }}</div>
                </div>
              </div>
              <button *ngIf="currentUser" class="btn" style="background: var(--bg-hover); color: var(--danger); font-size: 0.82rem;" (click)="logout()">Logout</button>
            </div>
          </header>

          <router-outlet></router-outlet>
        </main>
      </div>
    </ng-template>
  `
})
export class AppComponent implements OnInit {
  currentUser: User | null = null;

  constructor(public router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.currentUser$.subscribe(u => this.currentUser = u);
  }

  isAuthPage(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/register');
  }

  getUserInitial(): string {
    if (this.currentUser && this.currentUser.name) {
      return this.currentUser.name.charAt(0).toUpperCase();
    }
    return 'U';
  }

  logout(): void {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }
}
