package com.example.spring_security_backend.controller;

import com.example.spring_security_backend.dto.UserDTO;
import com.example.spring_security_backend.security.jwt.JWTAuthResponse;
import com.example.spring_security_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("auth")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    public ResponseEntity<JWTAuthResponse> registerUser(@RequestBody UserDTO userDTO) {
        UserDTO user = new UserDTO();
        user.setUsername(user.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setPassword(userDTO.getPassword());
        return ResponseEntity.ok(authService.registerUser(user));
    }
}
