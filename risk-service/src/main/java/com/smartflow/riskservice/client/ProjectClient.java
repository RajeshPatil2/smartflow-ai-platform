package com.smartflow.riskservice.client;

import com.smartflow.riskservice.dto.ProjectDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "PROJECT-SERVICE", path = "/api/projects")
public interface ProjectClient {

    @GetMapping("/{id}")
    ProjectDto getProjectById(@PathVariable("id") Long id);
}
