package com.example.animal_travel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "travel_place")
public class TravelPlace {
    @Id
    @SequenceGenerator(name = "travel_place_id_generator", allocationSize = 1)
    @GeneratedValue(generator = "travel_place_id_generator")
    private Long id;
    private String name;

}
