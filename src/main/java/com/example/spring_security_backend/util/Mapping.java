package com.example.spring_security_backend.util;

import com.example.spring_security_backend.dto.UserDTO;
import com.example.spring_security_backend.model.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Mapping {
    private final ModelMapper mapper;

    public User toUserEntity(UserDTO userDTO) {
        return mapper.map(userDTO, User.class);
    }
}
