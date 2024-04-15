package com.example.animal_travel.data.to;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class MessageDTO {
    @NonNull
    private boolean isError;
    @NonNull
    private String message;
}
