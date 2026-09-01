package com.smartflow.aiinsightsservice.service;

import com.smartflow.aiinsightsservice.dto.AiInsightResponse;
import java.util.List;

public interface AiInsightsService {
    AiInsightResponse getProjectInsight(Long projectId);
    List<AiInsightResponse> getAllProjectInsights();
}
