package com.example.spring_security_backend.model;

import com.example.spring_security_backend.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    @Email
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    @NotNull
    private Role role;

    @Column(name = "password")
    private String password;
}
