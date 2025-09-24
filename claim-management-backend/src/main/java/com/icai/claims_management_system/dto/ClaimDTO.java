package com.icai.claims_management_system.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.icai.claims_management_system.model.Claim;

public class ClaimDTO {
    private Long id;
    private Integer srNo;
    private Integer claimCount;
    private Integer year;
    private String patientName;
    private String hospitalName;
    private String coveredIn;
    private String diseaseName;
    private LocalDate dateOfAdmission;
    private LocalDate dateOfDischarge;
    private Integer numberOfDaysStay;
    private Double claimAmount;
    private Double roomRentAmount;
    private Double nonPayableAmount;
    private Double payableAmount;
    private String status;
    private String approverUsername;
    private LocalDateTime approvalDate;
    private Long userId; // Only store user ID instead of full user object

    // Constructor from Claim entity
    public ClaimDTO(Claim claim) {
        this.id = claim.getId();
        this.srNo = claim.getSrNo();
        this.claimCount = claim.getClaimCount();
        this.year = claim.getYear();
        this.patientName = claim.getPatientName();
        this.hospitalName = claim.getHospitalName();
        this.coveredIn = claim.getCoveredIn();
        this.diseaseName = claim.getDiseaseName();
        this.dateOfAdmission = claim.getDateOfAdmission();
        this.dateOfDischarge = claim.getDateOfDischarge();
        this.numberOfDaysStay = claim.getNumberOfDaysStay();
        this.claimAmount = claim.getClaimAmount();
        this.roomRentAmount = claim.getRoomRentAmount();
        this.nonPayableAmount = claim.getNonPayableAmount();
        this.payableAmount = claim.getPayableAmount();
        this.status = claim.getStatus() != null ? claim.getStatus().name() : null;
        this.approverUsername = claim.getApproverUsername();
        this.approvalDate = claim.getApprovalDate();
        this.userId = claim.getUser() != null ? claim.getUser().getId() : null;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Integer getSrNo() { return srNo; }
    public void setSrNo(Integer srNo) { this.srNo = srNo; }
    
    public Integer getClaimCount() { return claimCount; }
    public void setClaimCount(Integer claimCount) { this.claimCount = claimCount; }
    
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    
    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }
    
    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }
    
    public String getCoveredIn() { return coveredIn; }
    public void setCoveredIn(String coveredIn) { this.coveredIn = coveredIn; }
    
    public String getDiseaseName() { return diseaseName; }
    public void setDiseaseName(String diseaseName) { this.diseaseName = diseaseName; }
    
    public LocalDate getDateOfAdmission() { return dateOfAdmission; }
    public void setDateOfAdmission(LocalDate dateOfAdmission) { this.dateOfAdmission = dateOfAdmission; }
    
    public LocalDate getDateOfDischarge() { return dateOfDischarge; }
    public void setDateOfDischarge(LocalDate dateOfDischarge) { this.dateOfDischarge = dateOfDischarge; }
    
    public Integer getNumberOfDaysStay() { return numberOfDaysStay; }
    public void setNumberOfDaysStay(Integer numberOfDaysStay) { this.numberOfDaysStay = numberOfDaysStay; }
    
    public Double getClaimAmount() { return claimAmount; }
    public void setClaimAmount(Double claimAmount) { this.claimAmount = claimAmount; }
    
    public Double getRoomRentAmount() { return roomRentAmount; }
    public void setRoomRentAmount(Double roomRentAmount) { this.roomRentAmount = roomRentAmount; }
    
    public Double getNonPayableAmount() { return nonPayableAmount; }
    public void setNonPayableAmount(Double nonPayableAmount) { this.nonPayableAmount = nonPayableAmount; }
    
    public Double getPayableAmount() { return payableAmount; }
    public void setPayableAmount(Double payableAmount) { this.payableAmount = payableAmount; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getApproverUsername() { return approverUsername; }
    public void setApproverUsername(String approverUsername) { this.approverUsername = approverUsername; }
    
    public LocalDateTime getApprovalDate() { return approvalDate; }
    public void setApprovalDate(LocalDateTime approvalDate) { this.approvalDate = approvalDate; }
    
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}