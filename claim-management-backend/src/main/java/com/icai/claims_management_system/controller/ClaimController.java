package com.icai.claims_management_system.controller;

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
    public ResponseEntity<Claim> submitClaim(@PathVariable String username, @RequestBody Claim claim) {
        User u = userService.findByUsername(username);
        if (u == null) return ResponseEntity.badRequest().build();
        claim.setUser(u);
        return ResponseEntity.ok(claimService.save(claim));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<Claim>> listByUser(@PathVariable String username) {
        List<Claim> claims = claimService.findByUsername(username);
        // Remove the 404 check - return 200 even with empty list
        return ResponseEntity.ok(claims);
    }

    @PostMapping("/approve/{id}")
    public ResponseEntity<Claim> approve(@PathVariable Long id, Authentication auth) {
        Claim updated = claimService.approve(id, auth.getName());
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<Claim> reject(@PathVariable Long id, Authentication auth) {
        Claim updated = claimService.reject(id, auth.getName());
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
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
    public ResponseEntity<List<Claim>> getAllClaims() {
        List<Claim> claims = claimService.findAll();
        return ResponseEntity.ok(claims);
    }
}