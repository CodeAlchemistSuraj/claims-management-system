package com.icai.claims_management_system.controller;

import com.icai.claims_management_system.model.User;
import com.icai.claims_management_system.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final UserService userService;

    public ProfileController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<Map<String, Object>> profileInfo(@PathVariable String username) {
    	User u = userService.findByUsername(username); 
        if (u == null) return ResponseEntity.notFound().build();

        Map<String, Object> out = new HashMap<>();
        out.put("fullName", u.getFullName());

        if (u.getDateOfBirth() != null) {
            int age = Period.between(u.getDateOfBirth(), LocalDate.now()).getYears();
            out.put("dateOfBirth", u.getDateOfBirth());
            out.put("age", age);
        }

        if (u.getDateOfJoining() != null) {
            int yearsOfService = Period.between(u.getDateOfJoining(), LocalDate.now()).getYears();
            out.put("dateOfJoining", u.getDateOfJoining());
            out.put("yearsOfService", yearsOfService);
        }

        if (u.isPensioner()) {
            out.put("pensionerStatus", u.getPensionerStatus());
            out.put("spouseName", u.getSpouseName());
            out.put("spouseDob", u.getSpouseDob());
            if (u.getSpouseDob() != null) {
                out.put("spouseAge", Period.between(u.getSpouseDob(), LocalDate.now()).getYears());
            }
            out.put("dateOfExpiry", u.getDateOfExpiry());
        }

        return ResponseEntity.ok(out);
    }
}
