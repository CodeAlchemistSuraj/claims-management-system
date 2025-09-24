package com.icai.claims_management_system.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

	
	
	
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "spouse_name")
    private String spouseName;

    @Column(name = "spouse_dob")
    private LocalDate spouseDob;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "is_alive")
    private Boolean isAlive;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "lifetime_used")
    private Double lifetimeUsed;

    @Column(name = "annual_used")
    private Double annualUsed;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;
    
    // Add this relationship mapping
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Claim> claims = new ArrayList<>();

    // Add getter and setter
    public List<Claim> getClaims() { return claims; }
    public void setClaims(List<Claim> claims) { this.claims = claims; }

    // Getters and Setters
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

    // This new getter method will resolve the compilation error.
    public LocalDate getDateOfExpiry() { return expiryDate; }

    public Double getLifetimeUsed() { return lifetimeUsed; }
    public void setLifetimeUsed(Double lifetimeUsed) { this.lifetimeUsed = lifetimeUsed; }

    public Double getAnnualUsed() { return annualUsed; }
    public void setAnnualUsed(Double annualUsed) { this.annualUsed = annualUsed; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }

    // Custom methods to bridge the gap between the database and the controllers
    public UserRole getRole() {
        if ("pensioner".equalsIgnoreCase(this.type)) {
            return UserRole.ROLE_ADMIN;
        }
        return UserRole.ROLE_USER;
    }

    public boolean isPensioner() {
        return "pensioner".equalsIgnoreCase(this.type);
    }

    public String getPensionerStatus() {
        return this.isAlive ? "Active" : "Deceased";
    }

    public String getFullName() {
        return this.name;
    }

    public LocalDate getDateOfBirth() {
        return this.dob;
    }

    public LocalDate getDateOfJoining() {
        return this.startDate;
    }
}
