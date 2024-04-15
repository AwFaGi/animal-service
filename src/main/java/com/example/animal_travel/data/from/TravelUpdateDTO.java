package com.example.animal_travel.data.from;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;

@Data
@AllArgsConstructor
public class TravelUpdateDTO {
    @NonNull
    private Long id;
    @NonNull
    private int expense;
    @NonNull
    private int time;
}
