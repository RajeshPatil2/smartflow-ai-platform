package com.smartflow.aiinsightsservice.dto;

public class TaskDto {
    private Long id;
    private Long projectId;
    private String title;
    private String storyType;
    private String status;
    private String priority;
    private Integer storyPoints;

    public TaskDto() {
    }

    public TaskDto(Long id, Long projectId, String title, String storyType, String status, String priority, Integer storyPoints) {
        this.id = id;
        this.projectId = projectId;
        this.title = title;
        this.storyType = storyType;
        this.status = status;
        this.priority = priority;
        this.storyPoints = storyPoints;
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

    public String getStoryType() {
        return storyType;
    }

    public void setStoryType(String storyType) {
        this.storyType = storyType;
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

    public Integer getStoryPoints() {
        return storyPoints;
    }

    public void setStoryPoints(Integer storyPoints) {
        this.storyPoints = storyPoints;
    }
}
