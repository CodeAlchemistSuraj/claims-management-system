package com.icai.claims_management_system.service;

import com.icai.claims_management_system.model.Claim;
import com.icai.claims_management_system.model.User;
import com.icai.claims_management_system.repository.ClaimRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ClaimService {
    private final ClaimRepository claimRepository;

    public ClaimService(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }

    public Claim save(Claim c) { return claimRepository.save(c); }

    public List<Claim> findByUser(User u) { return claimRepository.findByUser(u); }

    public Claim approve(Long claimId, String approverUsername) {
        Claim c = claimRepository.findById(claimId).orElse(null);
        if (c == null) return null;
        c.setStatus(com.icai.claims_management_system.model.ClaimStatus.APPROVED);
        c.setApproverUsername(approverUsername);
        c.setApprovalDate(LocalDateTime.now());
        return claimRepository.save(c);
    }

    public Claim reject(Long claimId, String approverUsername) {
        Claim c = claimRepository.findById(claimId).orElse(null);
        if (c == null) return null;
        c.setStatus(com.icai.claims_management_system.model.ClaimStatus.REJECTED);
        c.setApproverUsername(approverUsername);
        c.setApprovalDate(LocalDateTime.now());
        return claimRepository.save(c);
    }

    /**
     * Calculate total approved payable amounts grouped by year and lifetime for a user
     */
    public Map<String, Double> calculateQuotasForUser(User u) {
        List<Claim> approved = claimRepository.findByUser(u).stream()
                .filter(c -> c.getStatus() == com.icai.claims_management_system.model.ClaimStatus.APPROVED)
                .collect(Collectors.toList());

        double lifetime = approved.stream().mapToDouble(c -> c.getPayableAmount() == null ? 0.0 : c.getPayableAmount()).sum();
        int currentYear = LocalDate.now().getYear();
        double yearSum = approved.stream().filter(c -> c.getYear() != null && c.getYear() == currentYear)
                .mapToDouble(c -> c.getPayableAmount() == null ? 0.0 : c.getPayableAmount()).sum();

        return Map.of("lifetimeUsed", lifetime, "yearUsed", yearSum);
    }
}
