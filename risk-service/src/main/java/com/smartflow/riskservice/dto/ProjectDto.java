package com.smartflow.riskservice.dto;

public class ProjectDto {
    private Long id;
    private String projectName;
    private String clientName;
    private String status;
    private String priority;

    public ProjectDto() {
    }

    public ProjectDto(Long id, String projectName, String clientName, String status, String priority) {
        this.id = id;
        this.projectName = projectName;
        this.clientName = clientName;
        this.status = status;
        this.priority = priority;
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
}
