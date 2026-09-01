import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Project, TaskItem, RiskItem, AiInsight, User } from '../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container">
      <!-- AI Intelligence Header Alert -->
      <div *ngIf="topInsight" style="background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15)); border: 1px solid var(--primary); border-radius: 12px; padding: 20px; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; font-weight: 600; color: #a5b4fc; margin-bottom: 6px;">
            🤖 AI Intelligence Briefing - {{ topInsight.projectName }}
            <span class="badge" [ngClass]="{'badge-critical': topInsight.riskLevel==='CRITICAL', 'badge-high': topInsight.riskLevel==='HIGH', 'badge-medium': topInsight.riskLevel==='MEDIUM', 'badge-low': topInsight.riskLevel==='LOW'}">
              Risk Level: {{ topInsight.riskLevel }}
            </span>
          </div>
          <p style="color: var(--text-main); font-size: 0.95rem;">{{ topInsight.message }}</p>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 4px;">💡 Recommendation: {{ topInsight.recommendation }}</p>
        </div>
        <a routerLink="/ai-insights" class="btn btn-primary">View AI Report</a>
      </div>

      <!-- KPI Summary Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <span>Total Projects</span>
            <div class="stat-icon" style="background: rgba(99,102,241,0.15); color: var(--primary);">📁</div>
          </div>
          <div class="stat-value">{{ projects.length }}</div>
          <span style="font-size: 0.8rem; color: var(--text-muted);">{{ activeProjectsCount }} Active in production</span>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span>Total Agile Tasks</span>
            <div class="stat-icon" style="background: rgba(6,182,212,0.15); color: var(--accent-cyan);">📌</div>
          </div>
          <div class="stat-value">{{ tasks.length }}</div>
          <span style="font-size: 0.8rem; color: var(--success);">{{ completedTasksCount }} Completed Stories</span>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span>Blocked Tasks</span>
            <div class="stat-icon" style="background: rgba(239,68,68,0.15); color: var(--danger);">🛑</div>
          </div>
          <div class="stat-value" style="color: #ff8888;">{{ blockedTasksCount }}</div>
          <span style="font-size: 0.8rem; color: var(--danger);">Requires developer unblocking</span>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span>Open Risks</span>
            <div class="stat-icon" style="background: rgba(245,158,11,0.15); color: var(--warning);">⚠️</div>
          </div>
          <div class="stat-value" style="color: var(--warning);">{{ openRisksCount }}</div>
          <span style="font-size: 0.8rem; color: #ff8888;">{{ criticalRisksCount }} Critical severity</span>
        </div>
      </div>

      <!-- Main Dashboard Grid -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
        <!-- Left: Active Projects & Sprint Progress -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 16px; color: #fff;">Active Projects & Completion Velocity</h3>

            <div *ngIf="projects.length === 0" style="color: var(--text-muted); font-size: 0.9rem; padding: 20px; text-align: center;">
              No projects created yet. <a routerLink="/projects" style="color: var(--primary);">Create your first project</a>.
            </div>

            <div *ngFor="let proj of projects" style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid var(--border-color);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div>
                  <span style="font-weight: 600; color: #fff; font-size: 0.95rem;">{{ proj.projectName }}</span>
                  <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 10px;">Client: {{ proj.clientName }}</span>
                </div>
                <span class="badge" [ngClass]="{'badge-high': proj.priority==='HIGH'||proj.priority==='CRITICAL', 'badge-medium': proj.priority==='MEDIUM', 'badge-low': proj.priority==='LOW'}">
                  {{ proj.priority }}
                </span>
              </div>
              <div style="background: var(--bg-hover); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
                <div style="background: linear-gradient(90deg, var(--primary), var(--accent-cyan)); height: 100%; transition: width 0.3s ease;" [style.width.%]="getProjectProgress(proj.id)"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted);">
                <span>Status: {{ proj.status }}</span>
                <span>{{ getProjectProgress(proj.id) }}% Completed</span>
              </div>
            </div>
          </div>

          <!-- JIRA Sprint Status Distribution -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 16px; color: #fff;">Agile Workflow Task Distribution</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
              <div style="background: var(--bg-hover); padding: 14px; border-radius: 8px; text-align: center;">
                <div style="color: var(--text-muted); font-size: 0.8rem;">TODO</div>
                <div style="font-size: 1.4rem; font-weight: 700; color: #fff;">{{ todoCount }}</div>
              </div>
              <div style="background: var(--bg-hover); padding: 14px; border-radius: 8px; text-align: center;">
                <div style="color: var(--text-muted); font-size: 0.8rem;">IN PROGRESS</div>
                <div style="font-size: 1.4rem; font-weight: 700; color: var(--accent-cyan);">{{ inProgressCount }}</div>
              </div>
              <div style="background: var(--bg-hover); padding: 14px; border-radius: 8px; text-align: center;">
                <div style="color: var(--text-muted); font-size: 0.8rem;">CODE REVIEW</div>
                <div style="font-size: 1.4rem; font-weight: 700; color: var(--secondary);">{{ codeReviewCount }}</div>
              </div>
              <div style="background: var(--bg-hover); padding: 14px; border-radius: 8px; text-align: center;">
                <div style="color: var(--text-muted); font-size: 0.8rem;">TESTING</div>
                <div style="font-size: 1.4rem; font-weight: 700; color: var(--warning);">{{ testingCount }}</div>
              </div>
              <div style="background: var(--bg-hover); padding: 14px; border-radius: 8px; text-align: center;">
                <div style="color: var(--text-muted); font-size: 0.8rem;">DONE</div>
                <div style="font-size: 1.4rem; font-weight: 700; color: var(--success);">{{ completedTasksCount }}</div>
              </div>
              <div style="background: var(--bg-hover); padding: 14px; border-radius: 8px; text-align: center;">
                <div style="color: var(--text-muted); font-size: 0.8rem;">BLOCKED</div>
                <div style="font-size: 1.4rem; font-weight: 700; color: var(--danger);">{{ blockedTasksCount }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Risk Matrix & Activity Stream -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- Critical Risks Widget -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
              <h3 style="font-size: 1rem; font-weight: 600; color: #fff;">Top Project Risks</h3>
              <a routerLink="/risks" style="color: var(--primary); font-size: 0.82rem; text-decoration: none;">View All</a>
            </div>

            <div *ngIf="risks.length === 0" style="color: var(--text-muted); font-size: 0.85rem;">No risks logged.</div>

            <div *ngFor="let r of risks.slice(0, 4)" style="background: var(--bg-hover); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid;" [style.border-left-color]="r.severity==='CRITICAL'||r.severity==='HIGH' ? 'var(--danger)' : 'var(--warning)'">
              <div style="font-weight: 600; font-size: 0.88rem; color: #fff;">{{ r.title }}</div>
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
                <span>Probability: {{ r.probability }}</span>
                <span>Severity: <strong>{{ r.severity }}</strong></span>
              </div>
            </div>
          </div>

          <!-- Activity Stream -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px;">
            <h3 style="font-size: 1rem; font-weight: 600; margin-bottom: 14px; color: #fff;">Recent Activity Feed</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 0.85rem;">
              <li style="display: flex; gap: 10px; color: var(--text-muted);">
                <span>🟢</span>
                <div>
                  <strong style="color: #fff;">System Initialized</strong><br>
                  <span style="font-size: 0.75rem;">Eureka Service Discovery & Gateway running</span>
                </div>
              </li>
              <li style="display: flex; gap: 10px; color: var(--text-muted);">
                <span>🤖</span>
                <div>
                  <strong style="color: #fff;">AI Intelligence Engine</strong><br>
                  <span style="font-size: 0.75rem;">Automated risk evaluation completed</span>
                </div>
              </li>
              <li style="display: flex; gap: 10px; color: var(--text-muted);">
                <span>👤</span>
                <div>
                  <strong style="color: #fff;">Authentication Gateway</strong><br>
                  <span style="font-size: 0.75rem;">JWT authorization tokens active</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  projects: Project[] = [];
  tasks: TaskItem[] = [];
  risks: RiskItem[] = [];
  aiInsights: AiInsight[] = [];
  topInsight: AiInsight | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getProjects().subscribe(projs => this.projects = projs || []);
    this.apiService.getTasks().subscribe(tsks => this.tasks = tsks || []);
    this.apiService.getRisks().subscribe(rsks => this.risks = rsks || []);
    this.apiService.getAllAiInsights().subscribe(insights => {
      this.aiInsights = insights || [];
      if (this.aiInsights.length > 0) {
        this.topInsight = this.aiInsights[0];
      }
    });
  }

  get activeProjectsCount(): number {
    return this.projects.filter(p => p.status === 'IN_PROGRESS' || p.status === 'PLANNED').length;
  }

  get completedTasksCount(): number {
    return this.tasks.filter(t => t.status === 'DONE').length;
  }

  get blockedTasksCount(): number {
    return this.tasks.filter(t => t.status === 'BLOCKED').length;
  }

  get openRisksCount(): number {
    return this.risks.filter(r => r.status === 'OPEN').length;
  }

  get criticalRisksCount(): number {
    return this.risks.filter(r => r.severity === 'CRITICAL' && r.status === 'OPEN').length;
  }

  get todoCount(): number { return this.tasks.filter(t => t.status === 'TODO').length; }
  get inProgressCount(): number { return this.tasks.filter(t => t.status === 'IN_PROGRESS').length; }
  get codeReviewCount(): number { return this.tasks.filter(t => t.status === 'CODE_REVIEW').length; }
  get testingCount(): number { return this.tasks.filter(t => t.status === 'TESTING').length; }

  getProjectProgress(projectId?: number): number {
    if (!projectId) return 0;
    const projTasks = this.tasks.filter(t => t.projectId === projectId);
    if (projTasks.length === 0) return 0;
    const done = projTasks.filter(t => t.status === 'DONE').length;
    return Math.round((done / projTasks.length) * 100);
  }
}
