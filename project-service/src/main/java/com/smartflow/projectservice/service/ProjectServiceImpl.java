package com.smartflow.projectservice.service;

import com.smartflow.projectservice.dto.ProjectDto;
import com.smartflow.projectservice.entity.Project;
import com.smartflow.projectservice.exception.ResourceNotFoundException;
import com.smartflow.projectservice.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public ProjectDto createProject(ProjectDto projectDto) {
        Project project = mapToEntity(projectDto);
        Project savedProject = projectRepository.save(project);
        return mapToDto(savedProject);
    }

    @Override
    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectDto getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        return mapToDto(project);
    }

    @Override
    public ProjectDto updateProject(Long id, ProjectDto projectDto) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

        project.setProjectName(projectDto.getProjectName());
        project.setDescription(projectDto.getDescription());
        project.setClientName(projectDto.getClientName());
        project.setStatus(projectDto.getStatus());
        project.setPriority(projectDto.getPriority());
        project.setStartDate(projectDto.getStartDate());
        project.setEndDate(projectDto.getEndDate());

        Project updatedProject = projectRepository.save(project);
        return mapToDto(updatedProject);
    }

    @Override
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }

    private Project mapToEntity(ProjectDto dto) {
        Project project = new Project();
        project.setProjectName(dto.getProjectName());
        project.setDescription(dto.getDescription());
        project.setClientName(dto.getClientName());
        project.setStatus(dto.getStatus());
        project.setPriority(dto.getPriority());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        return project;
    }

    private ProjectDto mapToDto(Project project) {
        return new ProjectDto(
                project.getId(),
                project.getProjectName(),
                project.getDescription(),
                project.getClientName(),
                project.getStatus(),
                project.getPriority(),
                project.getStartDate(),
                project.getEndDate(),
                project.getCreatedAt()
        );
    }
}
