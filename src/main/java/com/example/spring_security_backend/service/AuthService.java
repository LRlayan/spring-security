package com.example.spring_security_backend.service;

import com.example.spring_security_backend.dto.UserDTO;
import com.example.spring_security_backend.security.jwt.JWTAuthResponse;

public interface AuthService {
    JWTAuthResponse registerUser(UserDTO userDTO);
}
