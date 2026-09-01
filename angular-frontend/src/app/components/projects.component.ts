import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Project } from '../models/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="page-container">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 700; color: #fff;">Enterprise Projects</h2>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Manage client deliverables and development timelines</p>
        </div>
        <button class="btn btn-primary" (click)="toggleModal()">+ New Project</button>
      </div>

      <!-- Search & Filters -->
      <div style="display: flex; gap: 14px; background: var(--bg-card); padding: 14px; border-radius: 10px; border: 1px solid var(--border-color);">
        <input type="text" class="form-control" [(ngModel)]="searchQuery" placeholder="Search projects by name or client..." style="max-width: 320px;">
        <select class="form-control" [(ngModel)]="statusFilter" style="max-width: 180px;">
          <option value="">All Statuses</option>
          <option value="PLANNED">PLANNED</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="ON_HOLD">ON_HOLD</option>
        </select>
        <select class="form-control" [(ngModel)]="priorityFilter" style="max-width: 180px;">
          <option value="">All Priorities</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>
      </div>

      <!-- Projects Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
        <div *ngFor="let p of filteredProjects" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 22px; display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h3 style="font-size: 1.1rem; font-weight: 600; color: #fff;">{{ p.projectName }}</h3>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">Client: <strong>{{ p.clientName }}</strong></div>
            </div>
            <span class="badge" [ngClass]="{'badge-critical': p.priority==='CRITICAL', 'badge-high': p.priority==='HIGH', 'badge-medium': p.priority==='MEDIUM', 'badge-low': p.priority==='LOW'}">
              {{ p.priority }}
            </span>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.4;">{{ p.description || 'No description provided.' }}</p>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid var(--border-color); font-size: 0.82rem; color: var(--text-muted);">
            <span>Status: <strong style="color: #fff;">{{ p.status }}</strong></span>
            <span>Created: {{ p.createdAt ? (p.createdAt | date:'mediumDate') : 'Today' }}</span>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 4px;">
            <button class="btn btn-primary" style="flex: 1; justify-content: center; font-size: 0.82rem;" (click)="editProject(p)">Edit</button>
            <button class="btn" style="background: rgba(239,68,68,0.15); color: var(--danger); font-size: 0.82rem;" (click)="deleteProject(p.id!)">Delete</button>
          </div>
        </div>
      </div>

      <!-- Create / Edit Modal -->
      <div *ngIf="showModal" style="position: fixed; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 28px; width: 100%; max-width: 500px;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 18px;">{{ currentProject.id ? 'Edit Project' : 'Create New Project' }}</h3>

          <form (ngSubmit)="saveProject()">
            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.85rem; color: var(--text-muted);">Project Name</label>
              <input type="text" class="form-control" [(ngModel)]="currentProject.projectName" name="projectName" required placeholder="Smart Banking Platform">
            </div>

            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.85rem; color: var(--text-muted);">Client Name</label>
              <input type="text" class="form-control" [(ngModel)]="currentProject.clientName" name="clientName" required placeholder="ABC Technologies">
            </div>

            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.85rem; color: var(--text-muted);">Description</label>
              <textarea class="form-control" [(ngModel)]="currentProject.description" name="description" rows="3" placeholder="Enter enterprise project scope..."></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px;">
              <div>
                <label style="font-size: 0.85rem; color: var(--text-muted);">Status</label>
                <select class="form-control" [(ngModel)]="currentProject.status" name="status">
                  <option value="PLANNED">PLANNED</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="ON_HOLD">ON_HOLD</option>
                </select>
              </div>

              <div>
                <label style="font-size: 0.85rem; color: var(--text-muted);">Priority</label>
                <select class="form-control" [(ngModel)]="currentProject.priority" name="priority">
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 12px;">
              <button type="button" class="btn" style="background: var(--bg-hover); color: #fff;" (click)="toggleModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Project</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  searchQuery = '';
  statusFilter = '';
  priorityFilter = '';
  showModal = false;

  currentProject: Project = {
    projectName: '',
    clientName: '',
    description: '',
    status: 'IN_PROGRESS',
    priority: 'HIGH'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe(data => this.projects = data || []);
  }

  get filteredProjects(): Project[] {
    return this.projects.filter(p => {
      const matchesSearch = p.projectName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            p.clientName.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = !this.statusFilter || p.status === this.statusFilter;
      const matchesPriority = !this.priorityFilter || p.priority === this.priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
    if (!this.showModal) {
      this.resetForm();
    }
  }

  editProject(proj: Project): void {
    this.currentProject = { ...proj };
    this.showModal = true;
  }

  saveProject(): void {
    if (this.currentProject.id) {
      this.apiService.updateProject(this.currentProject.id, this.currentProject).subscribe(() => {
        this.loadProjects();
        this.toggleModal();
      });
    } else {
      this.apiService.createProject(this.currentProject).subscribe(() => {
        this.loadProjects();
        this.toggleModal();
      });
    }
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.apiService.deleteProject(id).subscribe(() => this.loadProjects());
    }
  }

  resetForm(): void {
    this.currentProject = {
      projectName: '',
      clientName: '',
      description: '',
      status: 'IN_PROGRESS',
      priority: 'HIGH'
    };
  }
}
