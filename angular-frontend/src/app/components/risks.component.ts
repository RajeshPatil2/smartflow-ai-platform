import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { RiskItem, Project } from '../models/models';

@Component({
  selector: 'app-risks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="font-size: 1.4rem; font-weight: 700; color: #fff;">Enterprise Risk Matrix</h2>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Track technical, schedule, and resource risks with automated severity assessment</p>
        </div>
        <button class="btn btn-primary" (click)="toggleModal()">+ Log New Risk</button>
      </div>

      <!-- Severity Matrix Cards -->
      <div class="stats-grid">
        <div class="stat-card" style="border-left: 4px solid var(--danger);">
          <div class="stat-header">CRITICAL RISKS</div>
          <div class="stat-value" style="color: #ff8888;">{{ getCountBySeverity('CRITICAL') }}</div>
          <span style="font-size: 0.78rem; color: var(--danger);">Requires immediate mitigation</span>
        </div>

        <div class="stat-card" style="border-left: 4px solid var(--danger);">
          <div class="stat-header">HIGH SEVERITY</div>
          <div class="stat-value" style="color: var(--danger);">{{ getCountBySeverity('HIGH') }}</div>
          <span style="font-size: 0.78rem; color: var(--text-muted);">High impact items</span>
        </div>

        <div class="stat-card" style="border-left: 4px solid var(--warning);">
          <div class="stat-header">MEDIUM SEVERITY</div>
          <div class="stat-value" style="color: var(--warning);">{{ getCountBySeverity('MEDIUM') }}</div>
          <span style="font-size: 0.78rem; color: var(--text-muted);">Moderate impact</span>
        </div>

        <div class="stat-card" style="border-left: 4px solid var(--success);">
          <div class="stat-header">LOW SEVERITY</div>
          <div class="stat-value" style="color: var(--success);">{{ getCountBySeverity('LOW') }}</div>
          <span style="font-size: 0.78rem; color: var(--text-muted);">Monitored items</span>
        </div>
      </div>

      <!-- Risks Table -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; overflow: hidden;">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Risk Title</th>
              <th>Probability</th>
              <th>Impact</th>
              <th>Calculated Severity</th>
              <th>Status</th>
              <th>Mitigation Plan</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of risks">
              <td>
                <strong style="color: #fff;">{{ r.title }}</strong><br>
                <span style="font-size: 0.78rem; color: var(--text-muted);">{{ r.description }}</span>
              </td>
              <td>{{ r.probability }}</td>
              <td>{{ r.impact }}</td>
              <td>
                <span class="badge" [ngClass]="{'badge-critical': r.severity==='CRITICAL', 'badge-high': r.severity==='HIGH', 'badge-medium': r.severity==='MEDIUM', 'badge-low': r.severity==='LOW'}">
                  {{ r.severity }}
                </span>
              </td>
              <td>
                <span style="font-weight: 600;" [style.color]="r.status==='OPEN' ? 'var(--warning)' : 'var(--success)'">
                  {{ r.status }}
                </span>
              </td>
              <td style="font-size: 0.82rem; max-width: 260px; color: var(--text-muted);">
                {{ r.mitigationPlan || 'No plan recorded yet.' }}
              </td>
              <td>
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-primary" style="padding: 4px 10px; font-size: 0.78rem;" (click)="editRisk(r)">Edit</button>
                  <button class="btn" style="padding: 4px 10px; font-size: 0.78rem; background: rgba(239,68,68,0.15); color: var(--danger);" (click)="deleteRisk(r.id!)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Log Risk Modal -->
      <div *ngIf="showModal" style="position: fixed; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000;">
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 28px; width: 100%; max-width: 500px;">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-bottom: 18px;">{{ currentRisk.id ? 'Edit Risk Record' : 'Log Project Risk' }}</h3>

          <form (ngSubmit)="saveRisk()">
            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.85rem; color: var(--text-muted);">Project</label>
              <select class="form-control" [(ngModel)]="currentRisk.projectId" name="projectId" required>
                <option *ngFor="let p of projects" [value]="p.id">{{ p.projectName }}</option>
              </select>
            </div>

            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.85rem; color: var(--text-muted);">Risk Title</label>
              <input type="text" class="form-control" [(ngModel)]="currentRisk.title" name="title" required placeholder="e.g. Payment API Integration Delay">
            </div>

            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.85rem; color: var(--text-muted);">Description</label>
              <textarea class="form-control" [(ngModel)]="currentRisk.description" name="description" rows="2" placeholder="Detail the risk scenario..."></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
              <div>
                <label style="font-size: 0.85rem; color: var(--text-muted);">Probability</label>
                <select class="form-control" [(ngModel)]="currentRisk.probability" name="probability">
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>

              <div>
                <label style="font-size: 0.85rem; color: var(--text-muted);">Impact</label>
                <select class="form-control" [(ngModel)]="currentRisk.impact" name="impact">
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>
            </div>

            <div style="margin-bottom: 14px;">
              <label style="font-size: 0.85rem; color: var(--text-muted);">Status</label>
              <select class="form-control" [(ngModel)]="currentRisk.status" name="status">
                <option value="OPEN">OPEN</option>
                <option value="MITIGATED">MITIGATED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            <div style="margin-bottom: 20px;">
              <label style="font-size: 0.85rem; color: var(--text-muted);">Mitigation Strategy / Action Plan</label>
              <textarea class="form-control" [(ngModel)]="currentRisk.mitigationPlan" name="mitigationPlan" rows="3" placeholder="Explain steps to reduce impact or probability..."></textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 12px;">
              <button type="button" class="btn" style="background: var(--bg-hover); color: #fff;" (click)="toggleModal()">Cancel</button>
              <button type="submit" class="btn btn-primary">Save Risk Record</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class RisksComponent implements OnInit {
  risks: RiskItem[] = [];
  projects: Project[] = [];
  showModal = false;

  currentRisk: RiskItem = {
    projectId: 1,
    title: '',
    description: '',
    probability: 'HIGH',
    impact: 'HIGH',
    status: 'OPEN',
    mitigationPlan: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProjects().subscribe(p => {
      this.projects = p || [];
      if (this.projects.length > 0) {
        this.currentRisk.projectId = this.projects[0].id!;
      }
    });
    this.loadRisks();
  }

  loadRisks(): void {
    this.apiService.getRisks().subscribe(data => this.risks = data || []);
  }

  getCountBySeverity(sev: string): number {
    return this.risks.filter(r => r.severity === sev).length;
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
    if (!this.showModal) {
      this.resetForm();
    }
  }

  editRisk(risk: RiskItem): void {
    this.currentRisk = { ...risk };
    this.showModal = true;
  }

  saveRisk(): void {
    if (this.currentRisk.id) {
      this.apiService.updateRisk(this.currentRisk.id, this.currentRisk).subscribe(() => {
        this.loadRisks();
        this.toggleModal();
      });
    } else {
      this.apiService.createRisk(this.currentRisk).subscribe(() => {
        this.loadRisks();
        this.toggleModal();
      });
    }
  }

  deleteRisk(id: number): void {
    if (confirm('Delete this risk record?')) {
      this.apiService.deleteRisk(id).subscribe(() => this.loadRisks());
    }
  }

  resetForm(): void {
    this.currentRisk = {
      projectId: this.projects.length > 0 ? this.projects[0].id! : 1,
      title: '',
      description: '',
      probability: 'HIGH',
      impact: 'HIGH',
      status: 'OPEN',
      mitigationPlan: ''
    };
  }
}
