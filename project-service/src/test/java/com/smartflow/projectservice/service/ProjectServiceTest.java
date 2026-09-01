package com.smartflow.projectservice.service;

import com.smartflow.projectservice.dto.ProjectDto;
import com.smartflow.projectservice.entity.Project;
import com.smartflow.projectservice.entity.ProjectPriority;
import com.smartflow.projectservice.entity.ProjectStatus;
import com.smartflow.projectservice.exception.ResourceNotFoundException;
import com.smartflow.projectservice.repository.ProjectRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectServiceImpl projectService;

    private ProjectDto projectDto;

    @BeforeEach
    void setUp() {
        projectDto = new ProjectDto(null, "Smart Banking Platform", "Core banking app", "ABC Tech", ProjectStatus.IN_PROGRESS, ProjectPriority.HIGH, null, null, null);
    }

    @Test
    void createProject_Success() {
        Project savedProject = new Project(1L, "Smart Banking Platform", "Core banking app", "ABC Tech", ProjectStatus.IN_PROGRESS, ProjectPriority.HIGH, null, null, null);
        when(projectRepository.save(any(Project.class))).thenReturn(savedProject);

        ProjectDto result = projectService.createProject(projectDto);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Smart Banking Platform", result.getProjectName());
    }

    @Test
    void getProjectById_NotFound_ThrowsException() {
        when(projectRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> projectService.getProjectById(1L));
    }
}
