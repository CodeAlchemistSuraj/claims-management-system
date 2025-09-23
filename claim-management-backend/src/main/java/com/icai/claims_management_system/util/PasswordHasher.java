package com.icai.claims_management_system.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHasher {

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String plainTextPassword = "password123";
        String encodedPassword = encoder.encode(plainTextPassword);
        System.out.println("Plain Text Password: " + plainTextPassword);
        System.out.println("Encoded Password: " + encodedPassword);
    }
}
