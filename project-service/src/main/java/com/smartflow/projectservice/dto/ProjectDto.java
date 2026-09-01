package com.smartflow.projectservice.dto;

import com.smartflow.projectservice.entity.ProjectPriority;
import com.smartflow.projectservice.entity.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ProjectDto {

    private Long id;

    @NotBlank(message = "Project name is required")
    private String projectName;

    private String description;

    @NotBlank(message = "Client name is required")
    private String clientName;

    @NotNull(message = "Status is required")
    private ProjectStatus status;

    @NotNull(message = "Priority is required")
    private ProjectPriority priority;

    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime createdAt;

    public ProjectDto() {
    }

    public ProjectDto(Long id, String projectName, String description, String clientName, ProjectStatus status, ProjectPriority priority, LocalDate startDate, LocalDate endDate, LocalDateTime createdAt) {
        this.id = id;
        this.projectName = projectName;
        this.description = description;
        this.clientName = clientName;
        this.status = status;
        this.priority = priority;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdAt = createdAt;
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

    public ProjectStatus getStatus() {
        return status;
    }

    public void setStatus(ProjectStatus status) {
        this.status = status;
    }

    public ProjectPriority getPriority() {
        return priority;
    }

    public void setPriority(ProjectPriority priority) {
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
