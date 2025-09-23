package com.icai.claims_management_system.service;

import com.icai.claims_management_system.model.User;
import com.icai.claims_management_system.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> listAll() { return userRepository.findAll(); }

    public User save(User u) { return userRepository.save(u); }

    public User findByUsername(String username) { return userRepository.findByUsername(username).orElse(null); }
}
