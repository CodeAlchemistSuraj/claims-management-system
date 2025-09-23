package com.icai.claims_management_system.service;

import com.icai.claims_management_system.model.Claim;
import com.icai.claims_management_system.model.ClaimStatus; // Import the enum
import com.icai.claims_management_system.model.User;
import com.icai.claims_management_system.repository.ClaimRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ClaimService {
    
    private final ClaimRepository claimRepository;
    
    public ClaimService(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }
    
    // Use username instead of User object
    public Map<String, Double> calculateQuotasForUser(String username) {
        List<Claim> approved = claimRepository.findByUserUsername(username).stream()
                .filter(c -> c.getStatus() == ClaimStatus.APPROVED) // Use the imported enum
                .collect(Collectors.toList());

        double lifetime = approved.stream()
                .mapToDouble(c -> c.getPayableAmount() == null ? 0.0 : c.getPayableAmount())
                .sum();
        
        int currentYear = LocalDate.now().getYear();
        double yearSum = approved.stream()
                .filter(c -> c.getYear() != null && c.getYear() == currentYear)
                .mapToDouble(c -> c.getPayableAmount() == null ? 0.0 : c.getPayableAmount())
                .sum();

        return Map.of("lifetimeUsed", lifetime, "yearUsed", yearSum);
    }
    
    // Add other methods that need to be updated
    public List<Claim> findByUsername(String username) {
        return claimRepository.findByUserUsername(username);
    }
    
    public Claim save(Claim claim) {
        return claimRepository.save(claim);
    }
    
    public Claim approve(Long id, String approverUsername) {
        // Implement approve logic
        return claimRepository.findById(id).map(claim -> {
            claim.setStatus(ClaimStatus.APPROVED);
            claim.setApproverUsername(approverUsername);
            claim.setApprovalDate(java.time.LocalDateTime.now());
            return claimRepository.save(claim);
        }).orElse(null);
    }
    
    public Claim reject(Long id, String approverUsername) {
        // Implement reject logic
        return claimRepository.findById(id).map(claim -> {
            claim.setStatus(ClaimStatus.REJECTED);
            claim.setApproverUsername(approverUsername);
            claim.setApprovalDate(java.time.LocalDateTime.now());
            return claimRepository.save(claim);
        }).orElse(null);
    }
}