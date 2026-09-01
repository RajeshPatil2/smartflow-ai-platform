package com.smartflow.aiinsightsservice.dto;

import java.time.LocalDate;

public class ProjectDto {
    private Long id;
    private String projectName;
    private String description;
    private String clientName;
    private String status;
    private String priority;
    private LocalDate startDate;
    private LocalDate endDate;

    public ProjectDto() {
    }

    public ProjectDto(Long id, String projectName, String description, String clientName, String status, String priority, LocalDate startDate, LocalDate endDate) {
        this.id = id;
        this.projectName = projectName;
        this.description = description;
        this.clientName = clientName;
        this.status = status;
        this.priority = priority;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
