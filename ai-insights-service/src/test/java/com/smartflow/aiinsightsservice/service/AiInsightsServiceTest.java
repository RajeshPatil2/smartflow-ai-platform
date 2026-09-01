package com.smartflow.aiinsightsservice.service;

import com.smartflow.aiinsightsservice.client.ProjectClient;
import com.smartflow.aiinsightsservice.client.RiskClient;
import com.smartflow.aiinsightsservice.client.TaskClient;
import com.smartflow.aiinsightsservice.dto.AiInsightResponse;
import com.smartflow.aiinsightsservice.dto.ProjectDto;
import com.smartflow.aiinsightsservice.dto.RiskDto;
import com.smartflow.aiinsightsservice.dto.TaskDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AiInsightsServiceTest {

    @Mock
    private ProjectClient projectClient;

    @Mock
    private TaskClient taskClient;

    @Mock
    private RiskClient riskClient;

    @InjectMocks
    private AiInsightsServiceImpl aiInsightsService;

    @Test
    void getProjectInsight_CriticalRisk_ReturnsCriticalAssessment() {
        ProjectDto project = new ProjectDto(1L, "Smart Banking Platform", "Core banking app", "ABC Tech", "IN_PROGRESS", "HIGH", null, null);
        TaskDto blockedTask1 = new TaskDto(101L, 1L, "Payment API", "TASK", "BLOCKED", "HIGH", 5);
        TaskDto blockedTask2 = new TaskDto(102L, 1L, "Login Validation", "TASK", "BLOCKED", "HIGH", 3);
        TaskDto blockedTask3 = new TaskDto(103L, 1L, "Database Setup", "TASK", "BLOCKED", "HIGH", 5);

        RiskDto criticalRisk = new RiskDto(201L, 1L, "API Failure", "HIGH", "HIGH", "CRITICAL", "OPEN");

        when(projectClient.getProjectById(1L)).thenReturn(project);
        when(taskClient.getTasksByProjectId(1L)).thenReturn(List.of(blockedTask1, blockedTask2, blockedTask3));
        when(riskClient.getRisksByProjectId(1L)).thenReturn(List.of(criticalRisk));

        AiInsightResponse insight = aiInsightsService.getProjectInsight(1L);

        assertNotNull(insight);
        assertEquals("CRITICAL", insight.getRiskLevel());
        assertEquals(3, insight.getBlockedTasks());
        assertEquals(1, insight.getCriticalRisks());
        assertTrue(insight.getMessage().contains("Critical blockages detected"));
    }
}
