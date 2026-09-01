package com.smartflow.aiinsightsservice.dto;

public class RiskDto {
    private Long id;
    private Long projectId;
    private String title;
    private String probability;
    private String impact;
    private String severity;
    private String status;

    public RiskDto() {
    }

    public RiskDto(Long id, Long projectId, String title, String probability, String impact, String severity, String status) {
        this.id = id;
        this.projectId = projectId;
        this.title = title;
        this.probability = probability;
        this.impact = impact;
        this.severity = severity;
        this.status = status;
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

    public String getProbability() {
        return probability;
    }

    public void setProbability(String probability) {
        this.probability = probability;
    }

    public String getImpact() {
        return impact;
    }

    public void setImpact(String impact) {
        this.impact = impact;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
