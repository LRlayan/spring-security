package com.example.spring_security_backend.security.service;

import com.example.spring_security_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserDetailsServiceImpl {

    private final UserRepository userRepository;

    public UserDetailsService userDetailsService() {
        return username ->
                (UserDetails) userRepository.findByEmail(username).
                        orElseThrow(()->new UsernameNotFoundException("User Not Found"));
    }
}
