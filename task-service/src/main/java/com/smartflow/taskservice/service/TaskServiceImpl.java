package com.smartflow.taskservice.service;

import com.smartflow.taskservice.client.UserClient;
import com.smartflow.taskservice.dto.TaskDto;
import com.smartflow.taskservice.dto.UserDto;
import com.smartflow.taskservice.entity.Task;
import com.smartflow.taskservice.exception.ResourceNotFoundException;
import com.smartflow.taskservice.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserClient userClient;

    public TaskServiceImpl(TaskRepository taskRepository, UserClient userClient) {
        this.taskRepository = taskRepository;
        this.userClient = userClient;
    }

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Task task = mapToEntity(taskDto);
        Task savedTask = taskRepository.save(task);
        return mapToDto(savedTask);
    }

    @Override
    public List<TaskDto> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));
        return mapToDto(task);
    }

    @Override
    public List<TaskDto> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStoryType(taskDto.getStoryType());
        task.setStatus(taskDto.getStatus());
        task.setPriority(taskDto.getPriority());
        task.setAssigneeId(taskDto.getAssigneeId());
        task.setStoryPoints(taskDto.getStoryPoints());

        Task updatedTask = taskRepository.save(task);
        return mapToDto(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }

    private Task mapToEntity(TaskDto dto) {
        Task task = new Task();
        task.setProjectId(dto.getProjectId());
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStoryType(dto.getStoryType());
        task.setStatus(dto.getStatus());
        task.setPriority(dto.getPriority());
        task.setAssigneeId(dto.getAssigneeId());
        task.setStoryPoints(dto.getStoryPoints());
        return task;
    }

    private TaskDto mapToDto(Task task) {
        String assigneeName = "Unassigned";
        if (task.getAssigneeId() != null) {
            try {
                UserDto user = userClient.getUserById(task.getAssigneeId());
                if (user != null && user.getName() != null) {
                    assigneeName = user.getName();
                }
            } catch (Exception ex) {
                assigneeName = "User #" + task.getAssigneeId();
            }
        }

        return new TaskDto(
                task.getId(),
                task.getProjectId(),
                task.getTitle(),
                task.getDescription(),
                task.getStoryType(),
                task.getStatus(),
                task.getPriority(),
                task.getAssigneeId(),
                assigneeName,
                task.getStoryPoints(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}
