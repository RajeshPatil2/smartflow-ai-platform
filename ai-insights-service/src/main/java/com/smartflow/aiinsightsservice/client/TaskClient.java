package com.smartflow.aiinsightsservice.client;

import com.smartflow.aiinsightsservice.dto.TaskDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "TASK-SERVICE", path = "/api/tasks")
public interface TaskClient {

    @GetMapping
    List<TaskDto> getAllTasks();

    @GetMapping("/project/{projectId}")
    List<TaskDto> getTasksByProjectId(@PathVariable("projectId") Long projectId);
}
