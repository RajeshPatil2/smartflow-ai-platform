package com.smartflow.riskservice.dto;

import com.smartflow.riskservice.entity.RiskLevel;
import com.smartflow.riskservice.entity.RiskSeverity;
import com.smartflow.riskservice.entity.RiskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class RiskDto {

    private Long id;

    @NotNull(message = "Project ID is required")
    private Long projectId;

    @NotBlank(message = "Risk title is required")
    private String title;

    private String description;

    @NotNull(message = "Probability is required")
    private RiskLevel probability;

    @NotNull(message = "Impact is required")
    private RiskLevel impact;

    private RiskSeverity severity;

    @NotNull(message = "Status is required")
    private RiskStatus status;

    private String mitigationPlan;
    private LocalDateTime createdAt;

    public RiskDto() {
    }

    public RiskDto(Long id, Long projectId, String title, String description, RiskLevel probability, RiskLevel impact, RiskSeverity severity, RiskStatus status, String mitigationPlan, LocalDateTime createdAt) {
        this.id = id;
        this.projectId = projectId;
        this.title = title;
        this.description = description;
        this.probability = probability;
        this.impact = impact;
        this.severity = severity;
        this.status = status;
        this.mitigationPlan = mitigationPlan;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public RiskLevel getProbability() {
        return probability;
    }

    public void setProbability(RiskLevel probability) {
        this.probability = probability;
    }

    public RiskLevel getImpact() {
        return impact;
    }

    public void setImpact(RiskLevel impact) {
        this.impact = impact;
    }

    public RiskSeverity getSeverity() {
        return severity;
    }

    public void setSeverity(RiskSeverity severity) {
        this.severity = severity;
    }

    public RiskStatus getStatus() {
        return status;
    }

    public void setStatus(RiskStatus status) {
        this.status = status;
    }

    public String getMitigationPlan() {
        return mitigationPlan;
    }

    public void setMitigationPlan(String mitigationPlan) {
        this.mitigationPlan = mitigationPlan;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
