package com.icai.claims_management_system.security;

import com.icai.claims_management_system.model.User;
import com.icai.claims_management_system.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find the user by username in the database
        Optional<User> optionalUser = userRepository.findByUsername(username);

        // Get the User object or throw an exception if not found
        User user = optionalUser.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        // FIXED: Handle UserRole enum correctly
     // Use the role directly - no need to add ROLE_ prefix since your enum already has it
        String role = user.getRole().name(); // This returns "ROLE_ADMIN" or "ROLE_USER"

        List<SimpleGrantedAuthority> authorities = Collections.singletonList(
            new SimpleGrantedAuthority(role) // Use the role as-is: "ROLE_ADMIN"
        );

        // Return the Spring Security UserDetails object with the correct role
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities);
    }
}