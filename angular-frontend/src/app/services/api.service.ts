import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, AuthResponse, Project, TaskItem, RiskItem, AiInsight } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private gatewayUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem('sf_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Auth APIs
  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.gatewayUrl}/users/register`, user).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  login(credentials: { email: string; password?: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.gatewayUrl}/users/login`, credentials).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  logout(): void {
    localStorage.removeItem('sf_token');
    localStorage.removeItem('sf_user');
    this.currentUserSubject.next(null);
  }

  private handleAuth(res: AuthResponse): void {
    if (res && res.token) {
      localStorage.setItem('sf_token', res.token);
      localStorage.setItem('sf_user', JSON.stringify(res.user));
      this.currentUserSubject.next(res.user);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // User Service APIs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.gatewayUrl}/users`);
  }

  // Project Service APIs
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.gatewayUrl}/projects`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.gatewayUrl}/projects/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.gatewayUrl}/projects`, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.gatewayUrl}/projects/${id}`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.gatewayUrl}/projects/${id}`);
  }

  // Task Service APIs
  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${this.gatewayUrl}/tasks`);
  }

  getTasksByProject(projectId: number): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(`${this.gatewayUrl}/tasks/project/${projectId}`);
  }

  createTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post<TaskItem>(`${this.gatewayUrl}/tasks`, task);
  }

  updateTask(id: number, task: TaskItem): Observable<TaskItem> {
    return this.http.put<TaskItem>(`${this.gatewayUrl}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.gatewayUrl}/tasks/${id}`);
  }

  // Risk Service APIs
  getRisks(): Observable<RiskItem[]> {
    return this.http.get<RiskItem[]>(`${this.gatewayUrl}/risks`);
  }

  getRisksByProject(projectId: number): Observable<RiskItem[]> {
    return this.http.get<RiskItem[]>(`${this.gatewayUrl}/risks/project/${projectId}`);
  }

  createRisk(risk: RiskItem): Observable<RiskItem> {
    return this.http.post<RiskItem>(`${this.gatewayUrl}/risks`, risk);
  }

  updateRisk(id: number, risk: RiskItem): Observable<RiskItem> {
    return this.http.put<RiskItem>(`${this.gatewayUrl}/risks/${id}`, risk);
  }

  deleteRisk(id: number): Observable<void> {
    return this.http.delete<void>(`${this.gatewayUrl}/risks/${id}`);
  }

  // AI Insights Service APIs
  getProjectInsight(projectId: number): Observable<AiInsight> {
    return this.http.get<AiInsight>(`${this.gatewayUrl}/ai/insights/project/${projectId}`);
  }

  getAllAiInsights(): Observable<AiInsight[]> {
    return this.http.get<AiInsight[]>(`${this.gatewayUrl}/ai/insights`);
  }
}
