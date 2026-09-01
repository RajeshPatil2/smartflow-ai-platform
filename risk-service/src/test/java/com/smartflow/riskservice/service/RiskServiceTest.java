package com.smartflow.riskservice.service;

import com.smartflow.riskservice.client.ProjectClient;
import com.smartflow.riskservice.entity.RiskLevel;
import com.smartflow.riskservice.entity.RiskSeverity;
import com.smartflow.riskservice.repository.RiskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
class RiskServiceTest {

    @Mock
    private RiskRepository riskRepository;

    @Mock
    private ProjectClient projectClient;

    @InjectMocks
    private RiskServiceImpl riskService;

    @Test
    void calculateSeverity_HighProbability_HighImpact_ReturnsCritical() {
        RiskSeverity severity = riskService.calculateSeverity(RiskLevel.HIGH, RiskLevel.HIGH);
        assertEquals(RiskSeverity.CRITICAL, severity);
    }

    @Test
    void calculateSeverity_HighProbability_MediumImpact_ReturnsHigh() {
        RiskSeverity severity = riskService.calculateSeverity(RiskLevel.HIGH, RiskLevel.MEDIUM);
        assertEquals(RiskSeverity.HIGH, severity);
    }

    @Test
    void calculateSeverity_MediumProbability_MediumImpact_ReturnsMedium() {
        RiskSeverity severity = riskService.calculateSeverity(RiskLevel.MEDIUM, RiskLevel.MEDIUM);
        assertEquals(RiskSeverity.MEDIUM, severity);
    }

    @Test
    void calculateSeverity_LowProbability_LowImpact_ReturnsLow() {
        RiskSeverity severity = riskService.calculateSeverity(RiskLevel.LOW, RiskLevel.LOW);
        assertEquals(RiskSeverity.LOW, severity);
    }
}
