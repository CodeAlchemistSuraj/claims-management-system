package com.icai.claims_management_system.dto;

import java.time.LocalDate;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import com.icai.claims_management_system.model.User;

public class UserDTO {
    private Long id;
    private String name;
    private String type;
    private LocalDate dob;
    private String spouseName;
    private LocalDate spouseDob;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isAlive;
    private LocalDate expiryDate;
    private Double lifetimeUsed;
    private Double annualUsed;
    private String username;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private List<ClaimDTO> claims;

    // Constructor from User entity
    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.type = user.getType();
        this.dob = user.getDob();
        this.spouseName = user.getSpouseName();
        this.spouseDob = user.getSpouseDob();
        this.startDate = user.getStartDate();
        this.endDate = user.getEndDate();
        this.isAlive = user.getAlive();
        this.expiryDate = user.getExpiryDate();
        this.lifetimeUsed = user.getLifetimeUsed();
        this.annualUsed = user.getAnnualUsed();
        this.username = user.getUsername();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
        
        // Convert claims to DTOs to break circular reference
        if (user.getClaims() != null) {
            this.claims = user.getClaims().stream()
                .map(ClaimDTO::new)
                .collect(Collectors.toList());
        }
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }
    
    public String getSpouseName() { return spouseName; }
    public void setSpouseName(String spouseName) { this.spouseName = spouseName; }
    
    public LocalDate getSpouseDob() { return spouseDob; }
    public void setSpouseDob(LocalDate spouseDob) { this.spouseDob = spouseDob; }
    
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    
    public Boolean getAlive() { return isAlive; }
    public void setAlive(Boolean alive) { isAlive = alive; }
    
    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }
    
    public Double getLifetimeUsed() { return lifetimeUsed; }
    public void setLifetimeUsed(Double lifetimeUsed) { this.lifetimeUsed = lifetimeUsed; }
    
    public Double getAnnualUsed() { return annualUsed; }
    public void setAnnualUsed(Double annualUsed) { this.annualUsed = annualUsed; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
    
    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
    
    public List<ClaimDTO> getClaims() { return claims; }
    public void setClaims(List<ClaimDTO> claims) { this.claims = claims; }
}