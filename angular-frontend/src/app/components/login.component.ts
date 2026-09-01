import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; background: var(--bg-main);">
      <div style="width: 100%; max-width: 400px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 36px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <div style="text-align: center; margin-bottom: 28px;">
          <div style="width: 50px; height: 50px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 12px; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: white; font-weight: 700;">SF</div>
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #fff;">SmartFlow AI</h2>
          <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 6px;">Enterprise Project & Risk Intelligence</p>
        </div>

        <div *ngIf="errorMessage" style="background: rgba(239, 68, 68, 0.15); border: 1px solid var(--danger); color: #ff8888; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; margin-bottom: 18px;">
          {{ errorMessage }}
        </div>

        <form (ngSubmit)="onLogin()">
          <div style="margin-bottom: 18px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 500; color: var(--text-muted); margin-bottom: 6px;">Email Address</label>
            <input type="email" class="form-control" [(ngModel)]="email" name="email" required placeholder="name@company.com">
          </div>

          <div style="margin-bottom: 24px;">
            <label style="display: block; font-size: 0.85rem; font-weight: 500; color: var(--text-muted); margin-bottom: 6px;">Password</label>
            <input type="password" class="form-control" [(ngModel)]="password" name="password" required placeholder="••••••••">
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 12px;">Sign In</button>
        </form>

        <div style="text-align: center; margin-top: 20px; font-size: 0.88rem; color: var(--text-muted);">
          Don't have an account? <a routerLink="/register" style="color: var(--primary); text-decoration: none; font-weight: 600;">Register Here</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = 'rajesh@example.com';
  password = 'password123';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = '';
    this.apiService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Login failed. Please verify email and password.';
      }
    });
  }
}
