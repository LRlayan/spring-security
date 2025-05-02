package com.example.spring_security_backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
    ADMIN("Admin"),
    USER("User"),
    MANAGER("Manager");

    private final String value;

    @JsonCreator
    public static Role fromString(String value) {
        for (Role type: Role.values()) {
            if (type.value.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown Value: " + value);
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
