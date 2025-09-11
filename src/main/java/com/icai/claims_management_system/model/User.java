package com.icai.claims_management_system.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.sql.Timestamp;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "id")
    private String id;

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

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private UserRole role;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

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

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public Timestamp getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Timestamp updatedAt) { this.updatedAt = updatedAt; }
    
    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }
}
