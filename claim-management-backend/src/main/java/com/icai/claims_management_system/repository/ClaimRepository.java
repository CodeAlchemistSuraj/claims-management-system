package com.icai.claims_management_system.repository;

import com.icai.claims_management_system.model.Claim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    
    List<Claim> findByUserUsername(String username);
    
    // Add optimized queries
    @Query("SELECT c FROM Claim c LEFT JOIN FETCH c.bills WHERE c.user.username = :username")
    List<Claim> findByUsernameWithBills(@Param("username") String username);
    
    @Query("SELECT c FROM Claim c LEFT JOIN FETCH c.bills LEFT JOIN FETCH c.user")
    List<Claim> findAllWithBillsAndUser();
    
    // For quota calculations - optimized
    @Query("SELECT COALESCE(SUM(c.payableAmount), 0) FROM Claim c WHERE c.user.username = :username AND c.status = 'APPROVED'")
    Double sumApprovedClaimsByUsername(@Param("username") String username);
    
    @Query("SELECT COALESCE(SUM(c.payableAmount), 0) FROM Claim c WHERE c.user.username = :username AND c.status = 'APPROVED' AND c.year = :year")
    Double sumApprovedClaimsByUsernameAndYear(@Param("username") String username, @Param("year") Integer year);
}