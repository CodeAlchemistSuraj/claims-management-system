package com.icai.claims_management_system.service;

import com.icai.claims_management_system.model.User;
import com.icai.claims_management_system.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Optimized method
    public User findByUsername(String username) {
        return userRepository.findByUsernameWithClaims(username)
                .orElse(null);
    }

    // Existing methods with optimization
    public List<User> listAll() {
        return userRepository.findAllWithClaims(); // Use optimized query
    }

    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }
}