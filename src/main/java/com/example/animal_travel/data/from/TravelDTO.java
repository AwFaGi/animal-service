package com.example.animal_travel.data.from;

import com.example.animal_travel.entity.Animal;
import com.example.animal_travel.entity.TravelPlace;
import com.example.animal_travel.entity.TravelType;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@AllArgsConstructor
public class TravelDTO {

    @NonNull
    private String from;
    @NonNull
    private String to;

    @NonNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date departureDate;

    @NonNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date arrivalDate;

    @NonNull
    private String travelType;

    @NonNull
    private Long animalId;

}
