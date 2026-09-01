package com.smartflow.riskservice.service;

import com.smartflow.riskservice.dto.RiskDto;
import com.smartflow.riskservice.entity.RiskLevel;
import com.smartflow.riskservice.entity.RiskSeverity;

import java.util.List;

public interface RiskService {
    RiskDto createRisk(RiskDto riskDto);
    List<RiskDto> getAllRisks();
    RiskDto getRiskById(Long id);
    List<RiskDto> getRisksByProjectId(Long projectId);
    RiskDto updateRisk(Long id, RiskDto riskDto);
    void deleteRisk(Long id);
    RiskSeverity calculateSeverity(RiskLevel probability, RiskLevel impact);
}
