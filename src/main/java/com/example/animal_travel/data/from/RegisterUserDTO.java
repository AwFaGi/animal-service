package com.example.animal_travel.data.from;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class RegisterUserDTO {
    @NonNull
    private String username;
    @NonNull
    private String password;
    @NonNull
    private String fio;
    @NonNull
    private String email;
    @NonNull
    private String phone;
    @NonNull
    private String citizenship;
}