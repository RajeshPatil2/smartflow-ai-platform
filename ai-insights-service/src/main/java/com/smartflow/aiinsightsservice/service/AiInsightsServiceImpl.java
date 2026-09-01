package com.smartflow.aiinsightsservice.service;

import com.smartflow.aiinsightsservice.client.ProjectClient;
import com.smartflow.aiinsightsservice.client.RiskClient;
import com.smartflow.aiinsightsservice.client.TaskClient;
import com.smartflow.aiinsightsservice.dto.AiInsightResponse;
import com.smartflow.aiinsightsservice.dto.ProjectDto;
import com.smartflow.aiinsightsservice.dto.RiskDto;
import com.smartflow.aiinsightsservice.dto.TaskDto;
import com.smartflow.aiinsightsservice.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AiInsightsServiceImpl implements AiInsightsService {

    private final ProjectClient projectClient;
    private final TaskClient taskClient;
    private final RiskClient riskClient;

    public AiInsightsServiceImpl(ProjectClient projectClient, TaskClient taskClient, RiskClient riskClient) {
        this.projectClient = projectClient;
        this.taskClient = taskClient;
        this.riskClient = riskClient;
    }

    @Override
    public AiInsightResponse getProjectInsight(Long projectId) {
        ProjectDto project;
        try {
            project = projectClient.getProjectById(projectId);
        } catch (Exception ex) {
            throw new ResourceNotFoundException("Project not found or unreachable with id: " + projectId);
        }

        List<TaskDto> tasks = new ArrayList<>();
        try {
            tasks = taskClient.getTasksByProjectId(projectId);
        } catch (Exception ignored) {}

        List<RiskDto> risks = new ArrayList<>();
        try {
            risks = riskClient.getRisksByProjectId(projectId);
        } catch (Exception ignored) {}

        int totalTasks = tasks.size();
        long blockedTasks = tasks.stream().filter(t -> "BLOCKED".equalsIgnoreCase(t.getStatus())).count();
        long completedTasks = tasks.stream().filter(t -> "DONE".equalsIgnoreCase(t.getStatus())).count();
        int openRisks = (int) risks.stream().filter(r -> "OPEN".equalsIgnoreCase(r.getStatus())).count();
        int criticalRisks = (int) risks.stream().filter(r -> "CRITICAL".equalsIgnoreCase(r.getSeverity()) && "OPEN".equalsIgnoreCase(r.getStatus())).count();

        double completionPercentage = totalTasks > 0 ? ((double) completedTasks / totalTasks) * 100 : 0.0;

        String riskLevel;
        String message;
        String recommendation;
        List<String> actionables = new ArrayList<>();

        if (criticalRisks > 0 || blockedTasks >= 3) {
            riskLevel = "CRITICAL";
            message = "Critical blockages detected! Project has " + criticalRisks + " unmitigated critical risks and " + blockedTasks + " blocked tasks.";
            recommendation = "Immediate executive escalation needed. Conduct daily sync to unblock critical path tasks and execute risk mitigation plans.";
            actionables.add("Assign lead senior engineer to resolve blocked task dependencies.");
            actionables.add("Review critical risk mitigation plan with client stakeholders.");
        } else if (blockedTasks > 0 || openRisks >= 2) {
            riskLevel = "HIGH";
            message = "Project velocity affected by " + blockedTasks + " blocked tasks and " + openRisks + " open risk items.";
            recommendation = "Reassign blocked stories to available developers and prioritize risk mitigation.";
            actionables.add("Re-evaluate sprint capacity and move blocked stories to review.");
            actionables.add("Update risk severity metrics.");
        } else if (completionPercentage < 50.0 && "HIGH".equalsIgnoreCase(project.getPriority())) {
            riskLevel = "MEDIUM";
            message = "High-priority project progress is currently at " + String.format("%.1f", completionPercentage) + "%.";
            recommendation = "Increase story point allocation in next sprint cycle.";
            actionables.add("Conduct backlog grooming for upcoming user stories.");
        } else {
            riskLevel = "LOW";
            message = "Project progress is healthy. " + String.format("%.1f", completionPercentage) + "% of tasks are completed with minimal risk.";
            recommendation = "Maintain current sprint pace and monitor incoming task queue.";
            actionables.add("Schedule routine sprint demo.");
        }

        return new AiInsightResponse(
                projectId,
                project.getProjectName(),
                riskLevel,
                message,
                recommendation,
                totalTasks,
                (int) blockedTasks,
                openRisks,
                criticalRisks,
                Math.round(completionPercentage * 10.0) / 10.0,
                actionables
        );
    }

    @Override
    public List<AiInsightResponse> getAllProjectInsights() {
        List<ProjectDto> projects;
        try {
            projects = projectClient.getAllProjects();
        } catch (Exception ex) {
            return new ArrayList<>();
        }

        return projects.stream()
                .map(p -> getProjectInsight(p.getId()))
                .collect(Collectors.toList());
    }
}
