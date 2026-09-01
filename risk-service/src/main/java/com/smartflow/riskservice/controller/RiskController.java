package com.smartflow.riskservice.controller;

import com.smartflow.riskservice.dto.RiskDto;
import com.smartflow.riskservice.service.RiskService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risks")
public class RiskController {

    private final RiskService riskService;

    public RiskController(RiskService riskService) {
        this.riskService = riskService;
    }

    @PostMapping
    public ResponseEntity<RiskDto> createRisk(@Valid @RequestBody RiskDto riskDto) {
        return new ResponseEntity<>(riskService.createRisk(riskDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<RiskDto>> getAllRisks() {
        return ResponseEntity.ok(riskService.getAllRisks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RiskDto> getRiskById(@PathVariable Long id) {
        return ResponseEntity.ok(riskService.getRiskById(id));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<RiskDto>> getRisksByProjectId(@PathVariable Long projectId) {
        return ResponseEntity.ok(riskService.getRisksByProjectId(projectId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RiskDto> updateRisk(@PathVariable Long id, @Valid @RequestBody RiskDto riskDto) {
        return ResponseEntity.ok(riskService.updateRisk(id, riskDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRisk(@PathVariable Long id) {
        riskService.deleteRisk(id);
        return ResponseEntity.noContent().build();
    }
}
