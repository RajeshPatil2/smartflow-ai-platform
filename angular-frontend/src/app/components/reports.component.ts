import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Project, TaskItem, RiskItem } from '../models/models';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 700; color: #fff;">Executive Reports & Data Export</h2>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Download project progress, agile task velocity, and risk assessments in CSV format</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-primary" (click)="exportProjectsCSV()">📥 Export Projects CSV</button>
          <button class="btn" style="background: var(--bg-card); color: #fff; border: 1px solid var(--border-color);" (click)="exportTasksCSV()">📥 Export Tasks CSV</button>
          <button class="btn" style="background: var(--bg-card); color: #fff; border: 1px solid var(--border-color);" (click)="exportRisksCSV()">📥 Export Risks CSV</button>
        </div>
      </div>

      <!-- Report Summary Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">Projects Summary</div>
          <div class="stat-value">{{ projects.length }}</div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Total portfolio projects</span>
        </div>

        <div class="stat-card">
          <div class="stat-header">Total Story Points</div>
          <div class="stat-value" style="color: var(--accent-cyan);">{{ totalStoryPoints }}</div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Allocated capacity</span>
        </div>

        <div class="stat-card">
          <div class="stat-header">Overall Risk Rating</div>
          <div class="stat-value" style="color: var(--warning);">{{ highRiskRatio }}%</div>
          <span style="font-size: 0.78rem; color: var(--text-muted);">High/Critical risk density</span>
        </div>
      </div>

      <!-- Detail Report Section -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 22px;">
        <h3 style="font-size: 1.1rem; font-weight: 600; color: #fff; margin-bottom: 16px;">Portfolio Progress Overview</h3>
        <table class="custom-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Client</th>
              <th>Status</th>
              <th>Tasks Count</th>
              <th>Completed Stories</th>
              <th>Open Risks</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of projects">
              <td><strong style="color: #fff;">{{ p.projectName }}</strong></td>
              <td>{{ p.clientName }}</td>
              <td><span class="badge badge-low">{{ p.status }}</span></td>
              <td>{{ getTaskCount(p.id!) }}</td>
              <td>{{ getCompletedTaskCount(p.id!) }}</td>
              <td>{{ getOpenRiskCount(p.id!) }}</td>
              <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="flex: 1; background: var(--bg-hover); height: 6px; border-radius: 3px; overflow: hidden;">
                    <div style="background: var(--primary); height: 100%;" [style.width.%]="getProgress(p.id!)"></div>
                  </div>
                  <span style="font-size: 0.8rem; font-weight: 600; color: #fff;">{{ getProgress(p.id!) }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ReportsComponent implements OnInit {
  projects: Project[] = [];
  tasks: TaskItem[] = [];
  risks: RiskItem[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProjects().subscribe(p => this.projects = p || []);
    this.apiService.getTasks().subscribe(t => this.tasks = t || []);
    this.apiService.getRisks().subscribe(r => this.risks = r || []);
  }

  get totalStoryPoints(): number {
    return this.tasks.reduce((sum, t) => sum + (t.storyPoints || 0), 0);
  }

  get highRiskRatio(): number {
    if (this.risks.length === 0) return 0;
    const high = this.risks.filter(r => r.severity === 'CRITICAL' || r.severity === 'HIGH').length;
    return Math.round((high / this.risks.length) * 100);
  }

  getTaskCount(projId: number): number {
    return this.tasks.filter(t => t.projectId === projId).length;
  }

  getCompletedTaskCount(projId: number): number {
    return this.tasks.filter(t => t.projectId === projId && t.status === 'DONE').length;
  }

  getOpenRiskCount(projId: number): number {
    return this.risks.filter(r => r.projectId === projId && r.status === 'OPEN').length;
  }

  getProgress(projId: number): number {
    const total = this.getTaskCount(projId);
    if (total === 0) return 0;
    return Math.round((this.getCompletedTaskCount(projId) / total) * 100);
  }

  exportProjectsCSV(): void {
    let csv = 'ID,Project Name,Client,Status,Priority\n';
    this.projects.forEach(p => {
      csv += `"${p.id}","${p.projectName}","${p.clientName}","${p.status}","${p.priority}"\n`;
    });
    this.downloadFile(csv, 'SmartFlow_Projects_Report.csv');
  }

  exportTasksCSV(): void {
    let csv = 'ID,Project ID,Title,Story Type,Status,Priority,Story Points,Assignee\n';
    this.tasks.forEach(t => {
      csv += `"${t.id}","${t.projectId}","${t.title}","${t.storyType}","${t.status}","${t.priority}","${t.storyPoints}","${t.assigneeName || ''}"\n`;
    });
    this.downloadFile(csv, 'SmartFlow_Tasks_Report.csv');
  }

  exportRisksCSV(): void {
    let csv = 'ID,Project ID,Title,Probability,Impact,Severity,Status,Mitigation Plan\n';
    this.risks.forEach(r => {
      csv += `"${r.id}","${r.projectId}","${r.title}","${r.probability}","${r.impact}","${r.severity}","${r.status}","${r.mitigationPlan || ''}"\n`;
    });
    this.downloadFile(csv, 'SmartFlow_Risks_Report.csv');
  }

  private downloadFile(data: string, filename: string): void {
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
