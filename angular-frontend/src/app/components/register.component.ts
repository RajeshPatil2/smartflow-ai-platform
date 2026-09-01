import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { User } from '../models/models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: var(--bg-main); padding: 20px;">
      <div style="width: 100%; max-width: 440px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 36px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #fff;">Create Account</h2>
          <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 4px;">Join SmartFlow AI platform</p>
        </div>

        <div *ngIf="errorMessage" style="background: rgba(239, 68, 68, 0.15); border: 1px solid var(--danger); color: #ff8888; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 18px;">
          {{ errorMessage }}
        </div>

        <form (ngSubmit)="onRegister()">
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 500; color: var(--text-muted); margin-bottom: 6px;">Full Name</label>
            <input type="text" class="form-control" [(ngModel)]="user.name" name="name" required placeholder="Rajesh Patil">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 500; color: var(--text-muted); margin-bottom: 6px;">Email Address</label>
            <input type="email" class="form-control" [(ngModel)]="user.email" name="email" required placeholder="rajesh@example.com">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 500; color: var(--text-muted); margin-bottom: 6px;">Password</label>
            <input type="password" class="form-control" [(ngModel)]="user.password" name="password" required placeholder="••••••••">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 500; color: var(--text-muted); margin-bottom: 6px;">Role</label>
            <select class="form-control" [(ngModel)]="user.role" name="role" required>
              <option value="ADMIN">ADMIN</option>
              <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
              <option value="TEAM_LEAD">TEAM_LEAD</option>
              <option value="DEVELOPER">DEVELOPER</option>
              <option value="TESTER">TESTER</option>
            </select>
          </div>

          <div style="margin-bottom: 24px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 500; color: var(--text-muted); margin-bottom: 6px;">Team Name</label>
            <input type="text" class="form-control" [(ngModel)]="user.team" name="team" required placeholder="Backend Team">
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 12px;">Register User</button>
        </form>

        <div style="text-align: center; margin-top: 20px; font-size: 0.88rem; color: var(--text-muted);">
          Already registered? <a routerLink="/login" style="color: var(--primary); text-decoration: none; font-weight: 600;">Login</a>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  user: User = {
    name: '',
    email: '',
    password: '',
    role: 'DEVELOPER',
    team: 'Backend Engineering'
  };
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onRegister(): void {
    this.errorMessage = '';
    this.apiService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Registration failed.';
      }
    });
  }
}
