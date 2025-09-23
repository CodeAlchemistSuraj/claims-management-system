package com.icai.claims_management_system.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Claim {
    @Id
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
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

    @Enumerated(EnumType.STRING)
    private ClaimStatus status = ClaimStatus.SUBMITTED;

    private String approverUsername;
    private LocalDateTime approvalDate;

    @ManyToOne
    @JoinColumn(name = "user_id") // Add this line
    private User user;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "claim_id")
    private List<BillLineItem> bills = new ArrayList<>();

    // getters/setters
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

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public List<BillLineItem> getBills() { return bills; }
    public void setBills(List<BillLineItem> bills) { this.bills = bills; }

    public ClaimStatus getStatus() { return status; }
    public void setStatus(ClaimStatus status) { this.status = status; }

    public String getApproverUsername() { return approverUsername; }
    public void setApproverUsername(String approverUsername) { this.approverUsername = approverUsername; }

    public LocalDateTime getApprovalDate() { return approvalDate; }
    public void setApprovalDate(LocalDateTime approvalDate) { this.approvalDate = approvalDate; }
}
