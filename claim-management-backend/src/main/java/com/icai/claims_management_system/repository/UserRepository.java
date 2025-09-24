package com.icai.claims_management_system.repository;

import com.icai.claims_management_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    // Add optimized query with claims
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.claims WHERE u.username = :username")
    Optional<User> findByUsernameWithClaims(@Param("username") String username);
    
    // For admin - get all users with claims
    @Query("SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.claims")
    List<User> findAllWithClaims();
}