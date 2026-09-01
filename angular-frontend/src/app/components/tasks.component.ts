import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { TaskItem, Project, User } from '../models/models';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 700; color: #fff;">Agile Kanban Task Board</h2>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Manage sprint user stories, bugs, and development tasks</p>
        </div>
        <button class="btn btn-primary" (click)="toggleModal()">+ Create Story / Task</button>
      </div>

      <!-- Filter Controls -->
      <div style="display: flex; gap: 14px; background: var(--bg-card); padding: 14px; border-radius: 10px; border: 1px solid var(--border-color);">
        <select class="form-control" [(ngModel)]="selectedProjectId" (change)="loadTasks()" style="max-width: 220px;">
          <option [ngValue]="null">All Projects</option>
          <option *ngFor="let p of projects" [value]="p.id">{{ p.projectName }}</option>
        </select>

        <input type="text" class="form-control" [(ngModel)]="searchQuery" placeholder="Search tasks by title..." style="max-width: 280px;">

        <select class="form-control" [(ngModel)]="storyTypeFilter" style="max-width: 160px;">
          <option value="">All Types</option>
          <option value="STORY">STORY</option>
          <option value="BUG">BUG</option>
          <option value="TASK">TASK</option>
        </select>
      </div>

      <!-- Kanban Columns Grid -->
      <div class="kanban-board">
        <div *ngFor="let col of columns" class="kanban-col">
          <div class="kanban-header">
            <span>{{ col.title }}</span>
            <span style="background: var(--bg-hover); padding: 2px 8px; border-radius: 12px; font-size: 0.78rem;">
              {{ getTasksForColumn(col.key).length }}
            </span>
          </div>

          <div *ngFor="let t of getTasksForColumn(col.key)" class="task-card" (click)="editTask(t)">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="badge" [ngClass]="{'badge-critical': t.storyType==='BUG', 'badge-medium': t.storyType==='STORY', 'badge-low': t.storyType==='TASK'}">
                {{ t.storyType }}
              </span>
              <span style="font-weight: 700; font-size: 0.8rem; color: var(--accent-cyan);">{{ t.storyPoints || 1 }} SP</span>
            </div>

            <div style="font-weight: 600; font-size: 0.92rem; color: #fff;">{{ t.title }}</div>
            <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.3;">{{ t.description || 'No story details.' }}</p>

            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid var(--border-color); font-size: 0.78rem; color: var(--text-muted);">
              <span>👤 {{ t.assigneeName || 'Unassigned' }}</span>
              <span class="badge" [ngClass]="{'badge-high': t.priority==='HIGH'||t.priority==='CRITICAL', 'badge-medium': t.priority==='MEDIUM', 'badge-low': t.priority==='LOW'}">
                {{ t.priority }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Task Modal -->
      <div *ngIf="showModal" style="position: fixed; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 28px; width: 100%; max-width: 520px;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 18px;">{{ currentTask.id ? 'Edit Task Story' : 'Create Task / User Story' }}</h3>

          <form (ngSubmit)="saveTask()">
            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.85rem; color: var(--text-muted);">Project</label>
              <select class="form-control" [(ngModel)]="currentTask.projectId" name="projectId" required>
                <option *ngFor="let p of projects" [value]="p.id">{{ p.projectName }}</option>
              </select>
            </div>

            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.85rem; color: var(--text-muted);">Task Title</label>
              <input type="text" class="form-control" [(ngModel)]="currentTask.title" name="title" required placeholder="e.g., Implement User Registration API">
            </div>

            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.85rem; color: var(--text-muted);">Description</label>
              <textarea class="form-control" [(ngModel)]="currentTask.description" name="description" rows="3" placeholder="Acceptance criteria and story details..."></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
              <div>
                <label style="font-size: 0.85rem; color: var(--text-muted);">Story Type</label>
                <select class="form-control" [(ngModel)]="currentTask.storyType" name="storyType">
                  <option value="STORY">STORY</option>
                  <option value="BUG">BUG</option>
                  <option value="TASK">TASK</option>
                </select>
              </div>

              <div>
                <label style="font-size: 0.85rem; color: var(--text-muted);">Status</label>
                <select class="form-control" [(ngModel)]="currentTask.status" name="status">
                  <option value="TODO">TODO</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="CODE_REVIEW">CODE_REVIEW</option>
                  <option value="TESTING">TESTING</option>
                  <option value="DONE">DONE</option>
                  <option value="BLOCKED">BLOCKED</option>
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 18px;">
              <div>
                <label style="font-size: 0.85rem; color: var(--text-muted);">Priority</label>
                <select class="form-control" [(ngModel)]="currentTask.priority" name="priority">
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

              <div>
                <label style="font-size: 0.85rem; color: var(--text-muted);">Assignee</label>
                <select class="form-control" [(ngModel)]="currentTask.assigneeId" name="assigneeId">
                  <option [ngValue]="null">Unassigned</option>
                  <option *ngFor="let u of users" [value]="u.id">{{ u.name }}</option>
                </select>
              </div>

              <div>
                <label style="font-size: 0.85rem; color: var(--text-muted);">Story Points</label>
                <input type="number" class="form-control" [(ngModel)]="currentTask.storyPoints" name="storyPoints" min="1" max="13">
              </div>
            </div>

            <div style="display: flex; justify-content: space-between;">
              <button type="button" *ngIf="currentTask.id" class="btn" style="background: rgba(239,68,68,0.15); color: var(--danger);" (click)="deleteTask(currentTask.id!)">Delete Task</button>

              <div style="display: flex; gap: 12px; margin-left: auto;">
                <button type="button" class="btn" style="background: var(--bg-hover); color: #fff;" (click)="toggleModal()">Cancel</button>
                <button type="submit" class="btn btn-primary">Save Task</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class TasksComponent implements OnInit {
  tasks: TaskItem[] = [];
  projects: Project[] = [];
  users: User[] = [];
  selectedProjectId: number | null = null;
  searchQuery = '';
  storyTypeFilter = '';
  showModal = false;

  columns = [
    { key: 'TODO', title: '📋 TODO' },
    { key: 'IN_PROGRESS', title: '⚙️ IN PROGRESS' },
    { key: 'CODE_REVIEW', title: '🔍 CODE REVIEW' },
    { key: 'TESTING', title: '🧪 TESTING' },
    { key: 'DONE', title: '✅ DONE' },
    { key: 'BLOCKED', title: '🛑 BLOCKED' }
  ];

  currentTask: TaskItem = {
    projectId: 1,
    title: '',
    description: '',
    storyType: 'STORY',
    status: 'TODO',
    priority: 'HIGH',
    storyPoints: 3
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProjects().subscribe(p => {
      this.projects = p || [];
      if (this.projects.length > 0) {
        this.currentTask.projectId = this.projects[0].id!;
      }
    });
    this.apiService.getUsers().subscribe(u => this.users = u || []);
    this.loadTasks();
  }

  loadTasks(): void {
    if (this.selectedProjectId) {
      this.apiService.getTasksByProject(this.selectedProjectId).subscribe(data => this.tasks = data || []);
    } else {
      this.apiService.getTasks().subscribe(data => this.tasks = data || []);
    }
  }

  getTasksForColumn(colKey: string): TaskItem[] {
    return this.tasks.filter(t => {
      const matchesStatus = t.status === colKey;
      const matchesSearch = t.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesType = !this.storyTypeFilter || t.storyType === this.storyTypeFilter;
      return matchesStatus && matchesSearch && matchesType;
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
    if (!this.showModal) {
      this.resetForm();
    }
  }

  editTask(task: TaskItem): void {
    this.currentTask = { ...task };
    this.showModal = true;
  }

  saveTask(): void {
    if (this.currentTask.id) {
      this.apiService.updateTask(this.currentTask.id, this.currentTask).subscribe(() => {
        this.loadTasks();
        this.toggleModal();
      });
    } else {
      this.apiService.createTask(this.currentTask).subscribe(() => {
        this.loadTasks();
        this.toggleModal();
      });
    }
  }

  deleteTask(id: number): void {
    if (confirm('Delete this task?')) {
      this.apiService.deleteTask(id).subscribe(() => {
        this.loadTasks();
        this.toggleModal();
      });
    }
  }

  resetForm(): void {
    this.currentTask = {
      projectId: this.projects.length > 0 ? this.projects[0].id! : 1,
      title: '',
      description: '',
      storyType: 'STORY',
      status: 'TODO',
      priority: 'HIGH',
      storyPoints: 3
    };
  }
}
