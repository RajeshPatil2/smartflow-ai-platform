package com.smartflow.aiinsightsservice.client;

import com.smartflow.aiinsightsservice.dto.ProjectDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "PROJECT-SERVICE", path = "/api/projects")
public interface ProjectClient {

    @GetMapping
    List<ProjectDto> getAllProjects();

    @GetMapping("/{id}")
    ProjectDto getProjectById(@PathVariable("id") Long id);
}
