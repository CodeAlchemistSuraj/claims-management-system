package com.icai.claims_management_system.controller;

import com.icai.claims_management_system.dto.ClaimDTO;
import com.icai.claims_management_system.model.Claim;
import com.icai.claims_management_system.model.User;
import com.icai.claims_management_system.service.ClaimService;
import com.icai.claims_management_system.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {
    private final ClaimService claimService;
    private final UserService userService;

    public ClaimController(ClaimService claimService, UserService userService) {
        this.claimService = claimService;
        this.userService = userService;
    }

    @PostMapping("/user/{username}")
    public ResponseEntity<ClaimDTO> submitClaim(@PathVariable String username, @RequestBody Claim claim) {
        User u = userService.findByUsername(username);
        if (u == null) return ResponseEntity.badRequest().build();
        claim.setUser(u);
        Claim savedClaim = claimService.save(claim);
        return ResponseEntity.ok(new ClaimDTO(savedClaim));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<ClaimDTO>> listByUser(@PathVariable String username) {
        List<Claim> claims = claimService.findByUsername(username);
        List<ClaimDTO> claimDTOs = claims.stream()
            .map(ClaimDTO::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(claimDTOs);
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<ClaimDTO> approve(@PathVariable Long id, Authentication auth) {
        Claim updated = claimService.approve(id, auth.getName());
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(new ClaimDTO(updated));
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<ClaimDTO> reject(@PathVariable Long id, Authentication auth) {
        Claim updated = claimService.reject(id, auth.getName());
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(new ClaimDTO(updated));
    }

    @GetMapping("/quotas/{username}")
    public ResponseEntity<Map<String, Double>> quotas(@PathVariable String username) {
        Map<String, Double> used = claimService.calculateQuotasForUser(username);
        double lifetimeQuota = 5000000.0;
        double annualQuota = 1000000.0;
        double lifetimeRemaining = lifetimeQuota - used.getOrDefault("lifetimeUsed", 0.0);
        double yearRemaining = annualQuota - used.getOrDefault("yearUsed", 0.0);

        return ResponseEntity.ok(Map.of(
                "lifetimeQuota", lifetimeQuota,
                "annualQuota", annualQuota,
                "lifetimeUsed", used.getOrDefault("lifetimeUsed", 0.0),
                "yearUsed", used.getOrDefault("yearUsed", 0.0),
                "lifetimeRemaining", lifetimeRemaining,
                "yearRemaining", yearRemaining
        ));
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ClaimDTO>> getAllClaims() {
        List<Claim> claims = claimService.findAll();
        List<ClaimDTO> claimDTOs = claims.stream()
            .map(ClaimDTO::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(claimDTOs);
    }
}