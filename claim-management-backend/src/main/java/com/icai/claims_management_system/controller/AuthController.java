package com.icai.claims_management_system.controller;

import com.icai.claims_management_system.dto.JwtResponse;
import com.icai.claims_management_system.dto.LoginRequest;
import com.icai.claims_management_system.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) throws Exception {
        // Authenticate the user with the provided username and password.
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        // Load user details to generate a token.
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

        // Generate the JWT token.
        final String token = jwtUtil.generateToken(userDetails);

        // Return the token in the response body.
        return ResponseEntity.ok(new JwtResponse(token));
    }
}
