package com.smartflow.aiinsightsservice.client;

import com.smartflow.aiinsightsservice.dto.RiskDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "RISK-SERVICE", path = "/api/risks")
public interface RiskClient {

    @GetMapping
    List<RiskDto> getAllRisks();

    @GetMapping("/project/{projectId}")
    List<RiskDto> getRisksByProjectId(@PathVariable("projectId") Long projectId);
}
