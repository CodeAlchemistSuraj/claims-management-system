package com.icai.claims_management_system.service;

import com.icai.claims_management_system.model.Claim;
import com.icai.claims_management_system.model.ClaimStatus;
import com.icai.claims_management_system.repository.ClaimRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class ClaimService {
    private final ClaimRepository claimRepository;

    public ClaimService(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    // Optimized methods
    public List<Claim> findByUsername(String username) {
        return claimRepository.findByUsernameWithBills(username); // Single query
    }

    public List<Claim> findAll() {
        return claimRepository.findAllWithBillsAndUser(); // Single query
    }

    // Optimized quota calculation
    public Map<String, Double> calculateQuotasForUser(String username) {
        Double lifetimeUsed = claimRepository.sumApprovedClaimsByUsername(username);
        Double yearUsed = claimRepository.sumApprovedClaimsByUsernameAndYear(username, LocalDateTime.now().getYear());
        
        return Map.of(
            "lifetimeUsed", lifetimeUsed != null ? lifetimeUsed : 0.0,
            "yearUsed", yearUsed != null ? yearUsed : 0.0
        );
    }

    @Transactional
    public Claim save(Claim claim) {
        return claimRepository.save(claim);
    }

    @Transactional
    public Claim approve(Long id, String approverUsername) {
        Claim claim = claimRepository.findById(id).orElse(null);
        if (claim != null) {
            claim.setStatus(ClaimStatus.APPROVED);
            claim.setApproverUsername(approverUsername);
            claim.setApprovalDate(LocalDateTime.now());
            return claimRepository.save(claim);
        }
        return null;
    }

    @Transactional
    public Claim reject(Long id, String approverUsername) {
        Claim claim = claimRepository.findById(id).orElse(null);
        if (claim != null) {
            claim.setStatus(ClaimStatus.REJECTED);
            claim.setApproverUsername(approverUsername);
            claim.setApprovalDate(LocalDateTime.now());
            return claimRepository.save(claim);
        }
        return null;
    }
}