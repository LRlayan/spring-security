package com.example.spring_security_backend.service.impl;

import com.example.spring_security_backend.dto.UserDTO;
import com.example.spring_security_backend.model.User;
import com.example.spring_security_backend.repository.UserRepository;
import com.example.spring_security_backend.security.jwt.JWTAuthResponse;
import com.example.spring_security_backend.security.jwt.JWTUtils;
import com.example.spring_security_backend.service.AuthService;
import com.example.spring_security_backend.util.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final Mapping mapping;
    private final UserRepository userRepository;
    private final JWTUtils jwtUtils;

    @Override
    public JWTAuthResponse registerUser(UserDTO userDTO) {
        UserDTO user = UserDTO.builder()
                .username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .role(userDTO.getRole())
                .password(userDTO.getPassword())
                .build();
        User save = userRepository.save(mapping.toUserEntity(user));
        String generateToken = jwtUtils.generateToken((UserDetails) save);
        return JWTAuthResponse.builder().token(generateToken).build();
    }
}
