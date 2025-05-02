package com.example.spring_security_backend.service.impl;

import com.example.spring_security_backend.dto.UserDTO;
import com.example.spring_security_backend.model.User;
import com.example.spring_security_backend.repository.UserRepository;
import com.example.spring_security_backend.security.jwt.JWTAuthResponse;
import com.example.spring_security_backend.security.jwt.JWTUtils;
import com.example.spring_security_backend.service.AuthService;
import com.example.spring_security_backend.util.Mapping;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final Mapping mapping;
    private final UserRepository userRepository;
    private final JWTUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

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

    @Override
    public JWTAuthResponse signInUser(UserDTO userDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword())
        );

        User user = userRepository.findByEmail(userDTO.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
        var generateToken = jwtUtils.generateToken((UserDetails) user);
        return JWTAuthResponse.builder().token(generateToken).build();
    }
}
