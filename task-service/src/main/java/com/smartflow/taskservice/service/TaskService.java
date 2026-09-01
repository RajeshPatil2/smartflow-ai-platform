package com.smartflow.taskservice.service;

import com.smartflow.taskservice.dto.TaskDto;
import java.util.List;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto);
    List<TaskDto> getAllTasks();
    TaskDto getTaskById(Long id);
    List<TaskDto> getTasksByProjectId(Long projectId);
    TaskDto updateTask(Long id, TaskDto taskDto);
    void deleteTask(Long id);
}
