import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div>
        <h2 style="font-size: 1.4rem; font-weight: 700; color: #fff;">System Notifications & Activity Logs</h2>
        <p style="color: var(--text-muted); font-size: 0.88rem;">Real-time notifications for task assignments, blocked stories, and risk severity triggers</p>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 22px;">
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 14px;">
          <li *ngFor="let notif of notifications" style="background: var(--bg-hover); padding: 16px; border-radius: 10px; border-left: 4px solid;" [style.border-left-color]="notif.type==='CRITICAL' ? 'var(--danger)' : (notif.type==='WARNING' ? 'var(--warning)' : 'var(--primary)')">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="color: #fff; font-size: 0.95rem;">{{ notif.title }}</strong>
              <span style="font-size: 0.78rem; color: var(--text-muted);">{{ notif.time }}</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted);">{{ notif.message }}</p>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class NotificationsComponent implements OnInit {
  notifications = [
    {
      title: '🚨 Critical Risk Flagged',
      message: 'High probability and high impact risk logged for Payment API integration.',
      type: 'CRITICAL',
      time: '10 mins ago'
    },
    {
      title: '🛑 Task Blocked in Sprint',
      message: 'Payment API Validation story moved to BLOCKED column by Developer team.',
      type: 'WARNING',
      time: '25 mins ago'
    },
    {
      title: '🤖 AI Intelligence Report Generated',
      message: 'SmartFlow AI evaluated project completion risk and generated escalation steps.',
      type: 'INFO',
      time: '1 hour ago'
    },
    {
      title: '👤 New Developer Assigned',
      message: 'Rajesh Patil assigned to Implement User Registration API task.',
      type: 'INFO',
      time: '2 hours ago'
    }
  ];

  ngOnInit(): void {}
}
