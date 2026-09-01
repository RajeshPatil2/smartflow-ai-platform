package com.smartflow.aiinsightsservice.dto;

import java.util.List;

public class AiInsightResponse {

    private Long projectId;
    private String projectName;
    private String riskLevel; // LOW, MEDIUM, HIGH, CRITICAL
    private String message;
    private String recommendation;
    private int totalTasks;
    private int blockedTasks;
    private int openRisks;
    private int criticalRisks;
    private double completionPercentage;
    private List<String> actionablePoints;

    public AiInsightResponse() {
    }

    public AiInsightResponse(Long projectId, String projectName, String riskLevel, String message, String recommendation, int totalTasks, int blockedTasks, int openRisks, int criticalRisks, double completionPercentage, List<String> actionablePoints) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.riskLevel = riskLevel;
        this.message = message;
        this.recommendation = recommendation;
        this.totalTasks = totalTasks;
        this.blockedTasks = blockedTasks;
        this.openRisks = openRisks;
        this.criticalRisks = criticalRisks;
        this.completionPercentage = completionPercentage;
        this.actionablePoints = actionablePoints;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }

    public int getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(int totalTasks) {
        this.totalTasks = totalTasks;
    }

    public int getBlockedTasks() {
        return blockedTasks;
    }

    public void setBlockedTasks(int blockedTasks) {
        this.blockedTasks = blockedTasks;
    }

    public int getOpenRisks() {
        return openRisks;
    }

    public void setOpenRisks(int openRisks) {
        this.openRisks = openRisks;
    }

    public int getCriticalRisks() {
        return criticalRisks;
    }

    public void setCriticalRisks(int criticalRisks) {
        this.criticalRisks = criticalRisks;
    }

    public double getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(double completionPercentage) {
        this.completionPercentage = completionPercentage;
    }

    public List<String> getActionablePoints() {
        return actionablePoints;
    }

    public void setActionablePoints(List<String> actionablePoints) {
        this.actionablePoints = actionablePoints;
    }
}
