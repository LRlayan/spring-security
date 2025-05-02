package com.example.spring_security_backend.controller;

import com.example.spring_security_backend.dto.UserDTO;
import com.example.spring_security_backend.security.jwt.JWTAuthResponse;
import com.example.spring_security_backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/v1/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<JWTAuthResponse> registerUser(@RequestBody UserDTO userDTO) {
        UserDTO user = new UserDTO();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setPassword(userDTO.getPassword());
        return ResponseEntity.ok(authService.registerUser(user));
    }

    @PostMapping(value = "/signIn", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JWTAuthResponse> signInUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(authService.signInUser(userDTO));
    }
}
