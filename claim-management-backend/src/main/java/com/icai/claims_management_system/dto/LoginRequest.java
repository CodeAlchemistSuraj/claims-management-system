package com.icai.claims_management_system.dto;


public class LoginRequest {

    private String username;
    private String password;

    // Default constructor is required for JSON deserialization
    public LoginRequest() {
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
