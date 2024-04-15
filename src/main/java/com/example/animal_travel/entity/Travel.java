package com.example.animal_travel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "travel")
public class Travel {
    @Id
    @SequenceGenerator(name = "travel_id_generator", allocationSize = 1)
    @GeneratedValue(generator = "travel_id_generator")
    private Long id;

    @ManyToOne
    private TravelPlace from;
    @ManyToOne
    private TravelPlace to;

    private Date departureDate;
    private Date arrivalDate;

    @ManyToOne
    private TravelType travelType;

    @ManyToOne
    private Animal animal;

    private int expenses;
    private int time;
}
