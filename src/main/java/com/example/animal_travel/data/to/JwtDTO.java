package com.example.animal_travel.data.to;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class JwtDTO {

    private boolean isError;
    @NonNull
    private String message;
    private String username;
    private String jwtToken;
}