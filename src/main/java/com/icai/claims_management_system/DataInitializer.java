package com.icai.claims_management_system;

import com.icai.claims_management_system.model.User;
import com.icai.claims_management_system.model.UserRole;
import com.icai.claims_management_system.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            // No static user initialization.
            // Application will start with no default users in the database.
        };
    }
}
