package com.icai.claims_management_system.controller;

import com.icai.claims_management_system.dto.UserDTO;
import com.icai.claims_management_system.model.User;
import com.icai.claims_management_system.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDTO> list() { 
        return userService.listAll().stream()
            .map(UserDTO::new)
            .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody User user) {
        User savedUser = userService.save(user);
        return ResponseEntity.ok(new UserDTO(savedUser));
    }
}