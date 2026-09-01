import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AiInsight } from '../models/models';

@Component({
  selector: 'app-ai-insights',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div>
        <h2 style="font-size: 1.4rem; font-weight: 700; color: #fff;">🤖 SmartFlow AI Project Intelligence</h2>
        <p style="color: var(--text-muted); font-size: 0.88rem;">Automated rule-based project health evaluation, blockage detection, and execution advice</p>
      </div>

      <div *ngIf="insights.length === 0" style="background: var(--bg-card); padding: 24px; border-radius: 12px; border: 1px solid var(--border-color); text-align: center; color: var(--text-muted);">
        No projects available to evaluate. Please create a project and add tasks/risks to generate AI insights.
      </div>

      <div *ngFor="let ins of insights" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px; padding: 24px; display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 14px;">
          <div>
            <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff;">{{ ins.projectName }}</h3>
            <span style="font-size: 0.82rem; color: var(--text-muted);">Project ID: #{{ ins.projectId }}</span>
          </div>
          <span class="badge" [ngClass]="{'badge-critical': ins.riskLevel==='CRITICAL', 'badge-high': ins.riskLevel==='HIGH', 'badge-medium': ins.riskLevel==='MEDIUM', 'badge-low': ins.riskLevel==='LOW'}">
            Risk Assessment: {{ ins.riskLevel }}
          </span>
        </div>

        <div style="background: var(--bg-hover); padding: 16px; border-radius: 10px; border-left: 4px solid var(--primary);">
          <div style="font-weight: 600; color: #fff; margin-bottom: 4px;">Assessment Finding:</div>
          <p style="color: var(--text-main); font-size: 0.92rem;">{{ ins.message }}</p>
        </div>

        <div style="background: rgba(16,185,129,0.1); padding: 16px; border-radius: 10px; border-left: 4px solid var(--success);">
          <div style="font-weight: 600; color: var(--success); margin-bottom: 4px;">💡 AI Recommendation:</div>
          <p style="color: #fff; font-size: 0.92rem;">{{ ins.recommendation }}</p>
        </div>

        <!-- Metric Grid -->
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; text-align: center;">
          <div style="background: var(--bg-hover); padding: 10px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Total Tasks</div>
            <div style="font-size: 1.2rem; font-weight: 700; color: #fff;">{{ ins.totalTasks }}</div>
          </div>

          <div style="background: var(--bg-hover); padding: 10px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Blocked Tasks</div>
            <div style="font-size: 1.2rem; font-weight: 700; color: var(--danger);">{{ ins.blockedTasks }}</div>
          </div>

          <div style="background: var(--bg-hover); padding: 10px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Open Risks</div>
            <div style="font-size: 1.2rem; font-weight: 700; color: var(--warning);">{{ ins.openRisks }}</div>
          </div>

          <div style="background: var(--bg-hover); padding: 10px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Critical Risks</div>
            <div style="font-size: 1.2rem; font-weight: 700; color: #ff8888;">{{ ins.criticalRisks }}</div>
          </div>

          <div style="background: var(--bg-hover); padding: 10px; border-radius: 8px;">
            <div style="font-size: 0.75rem; color: var(--text-muted);">Completion Rate</div>
            <div style="font-size: 1.2rem; font-weight: 700; color: var(--accent-cyan);">{{ ins.completionPercentage }}%</div>
          </div>
        </div>

        <!-- Actionables -->
        <div *ngIf="ins.actionablePoints && ins.actionablePoints.length > 0">
          <div style="font-weight: 600; font-size: 0.88rem; color: var(--text-muted); margin-bottom: 8px;">Recommended Action Items:</div>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
            <li *ngFor="let act of ins.actionablePoints" style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #fff;">
              <span style="color: var(--primary);">✓</span> {{ act }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class AiInsightsComponent implements OnInit {
  insights: AiInsight[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllAiInsights().subscribe(data => this.insights = data || []);
  }
}
