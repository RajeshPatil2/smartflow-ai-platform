package com.smartflow.aiinsightsservice.controller;

import com.smartflow.aiinsightsservice.dto.AiInsightResponse;
import com.smartflow.aiinsightsservice.service.AiInsightsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
public class AiInsightsController {

    private final AiInsightsService aiInsightsService;

    public AiInsightsController(AiInsightsService aiInsightsService) {
        this.aiInsightsService = aiInsightsService;
    }

    @GetMapping("/insights/project/{projectId}")
    public ResponseEntity<AiInsightResponse> getProjectInsight(@PathVariable Long projectId) {
        return ResponseEntity.ok(aiInsightsService.getProjectInsight(projectId));
    }

    @GetMapping("/insights")
    public ResponseEntity<List<AiInsightResponse>> getAllProjectInsights() {
        return ResponseEntity.ok(aiInsightsService.getAllProjectInsights());
    }
}
