package com.smartflow.riskservice.service;

import com.smartflow.riskservice.client.ProjectClient;
import com.smartflow.riskservice.dto.ProjectDto;
import com.smartflow.riskservice.dto.RiskDto;
import com.smartflow.riskservice.entity.Risk;
import com.smartflow.riskservice.entity.RiskLevel;
import com.smartflow.riskservice.entity.RiskSeverity;
import com.smartflow.riskservice.exception.ResourceNotFoundException;
import com.smartflow.riskservice.repository.RiskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RiskServiceImpl implements RiskService {

    private final RiskRepository riskRepository;
    private final ProjectClient projectClient;

    public RiskServiceImpl(RiskRepository riskRepository, ProjectClient projectClient) {
        this.riskRepository = riskRepository;
        this.projectClient = projectClient;
    }

    @Override
    public RiskSeverity calculateSeverity(RiskLevel probability, RiskLevel impact) {
        if (probability == RiskLevel.HIGH && impact == RiskLevel.HIGH) {
            return RiskSeverity.CRITICAL;
        } else if ((probability == RiskLevel.HIGH && impact == RiskLevel.MEDIUM) ||
                   (probability == RiskLevel.MEDIUM && impact == RiskLevel.HIGH)) {
            return RiskSeverity.HIGH;
        } else if ((probability == RiskLevel.HIGH && impact == RiskLevel.LOW) ||
                   (probability == RiskLevel.MEDIUM && impact == RiskLevel.MEDIUM) ||
                   (probability == RiskLevel.LOW && impact == RiskLevel.HIGH)) {
            return RiskSeverity.MEDIUM;
        } else {
            return RiskSeverity.LOW;
        }
    }

    @Override
    public RiskDto createRisk(RiskDto riskDto) {
        try {
            ProjectDto project = projectClient.getProjectById(riskDto.getProjectId());
            if (project == null) {
                throw new ResourceNotFoundException("Project not found with id: " + riskDto.getProjectId());
            }
        } catch (ResourceNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            // Service discovery or direct fallback
        }

        Risk risk = mapToEntity(riskDto);
        risk.setSeverity(calculateSeverity(riskDto.getProbability(), riskDto.getImpact()));
        Risk savedRisk = riskRepository.save(risk);
        return mapToDto(savedRisk);
    }

    @Override
    public List<RiskDto> getAllRisks() {
        return riskRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public RiskDto getRiskById(Long id) {
        Risk risk = riskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Risk not found with id: " + id));
        return mapToDto(risk);
    }

    @Override
    public List<RiskDto> getRisksByProjectId(Long projectId) {
        return riskRepository.findByProjectId(projectId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public RiskDto updateRisk(Long id, RiskDto riskDto) {
        Risk risk = riskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Risk not found with id: " + id));

        risk.setTitle(riskDto.getTitle());
        risk.setDescription(riskDto.getDescription());
        risk.setProbability(riskDto.getProbability());
        risk.setImpact(riskDto.getImpact());
        risk.setSeverity(calculateSeverity(riskDto.getProbability(), riskDto.getImpact()));
        risk.setStatus(riskDto.getStatus());
        risk.setMitigationPlan(riskDto.getMitigationPlan());

        Risk updatedRisk = riskRepository.save(risk);
        return mapToDto(updatedRisk);
    }

    @Override
    public void deleteRisk(Long id) {
        if (!riskRepository.existsById(id)) {
            throw new ResourceNotFoundException("Risk not found with id: " + id);
        }
        riskRepository.deleteById(id);
    }

    private Risk mapToEntity(RiskDto dto) {
        Risk risk = new Risk();
        risk.setProjectId(dto.getProjectId());
        risk.setTitle(dto.getTitle());
        risk.setDescription(dto.getDescription());
        risk.setProbability(dto.getProbability());
        risk.setImpact(dto.getImpact());
        risk.setStatus(dto.getStatus());
        risk.setMitigationPlan(dto.getMitigationPlan());
        return risk;
    }

    private RiskDto mapToDto(Risk risk) {
        return new RiskDto(
                risk.getId(),
                risk.getProjectId(),
                risk.getTitle(),
                risk.getDescription(),
                risk.getProbability(),
                risk.getImpact(),
                risk.getSeverity(),
                risk.getStatus(),
                risk.getMitigationPlan(),
                risk.getCreatedAt()
        );
    }
}
