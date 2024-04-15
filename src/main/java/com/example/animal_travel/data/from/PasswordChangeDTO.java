package com.example.animal_travel.data.from;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class PasswordChangeDTO {
    @NonNull
    private String username;
    @NonNull
    private String oldPassword;
    @NonNull
    private String newPassword;
}
