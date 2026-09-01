import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { User } from '../models/models';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div>
        <h2 style="font-size: 1.4rem; font-weight: 700; color: #fff;">Team Members & Organization Roles</h2>
        <p style="color: var(--text-muted); font-size: 0.88rem;">Registered developers, leads, testers, and project managers</p>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;">
        <table class="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Engineering Team</th>
              <th>Registered Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of users">
              <td>#{{ u.id }}</td>
              <td><strong style="color: #fff;">{{ u.name }}</strong></td>
              <td>{{ u.email }}</td>
              <td>
                <span class="badge" [ngClass]="{'badge-critical': u.role==='ADMIN', 'badge-high': u.role==='PROJECT_MANAGER', 'badge-medium': u.role==='TEAM_LEAD', 'badge-low': u.role==='DEVELOPER'||u.role==='TESTER'}">
                  {{ u.role }}
                </span>
              </td>
              <td>{{ u.team }}</td>
              <td style="color: var(--text-muted); font-size: 0.82rem;">{{ u.createdAt ? (u.createdAt | date:'short') : 'Active' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe(data => this.users = data || []);
  }
}
