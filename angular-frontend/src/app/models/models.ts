export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: 'ADMIN' | 'PROJECT_MANAGER' | 'TEAM_LEAD' | 'DEVELOPER' | 'TESTER';
  team: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Project {
  id?: number;
  projectName: string;
  description: string;
  clientName: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  startDate?: string;
  endDate?: string;
  createdAt?: string;
}

export interface TaskItem {
  id?: number;
  projectId: number;
  title: string;
  description: string;
  storyType: 'STORY' | 'BUG' | 'TASK';
  status: 'TODO' | 'IN_PROGRESS' | 'CODE_REVIEW' | 'TESTING' | 'DONE' | 'BLOCKED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  assigneeId?: number;
  assigneeName?: string;
  storyPoints?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RiskItem {
  id?: number;
  projectId: number;
  title: string;
  description: string;
  probability: 'LOW' | 'MEDIUM' | 'HIGH';
  impact: 'LOW' | 'MEDIUM' | 'HIGH';
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'MITIGATED' | 'CLOSED';
  mitigationPlan?: string;
  createdAt?: string;
}

export interface AiInsight {
  projectId: number;
  projectName: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  recommendation: string;
  totalTasks: number;
  blockedTasks: number;
  openRisks: number;
  criticalRisks: number;
  completionPercentage: number;
  actionablePoints: string[];
}
