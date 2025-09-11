package com.icai.claims_management_system.repository;

import com.icai.claims_management_system.model.Claim;
import com.icai.claims_management_system.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByUser(User user);
}
