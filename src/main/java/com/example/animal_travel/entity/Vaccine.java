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
@Table(name = "vaccine")
public class Vaccine {
    @Id
    @SequenceGenerator(name = "vaccine_id_generator", allocationSize = 1)
    @GeneratedValue(generator = "vaccine_id_generator")
    private Long id;

    private Date vaccineDate;

    @ManyToOne
    private VaccineType vaccineType;

    @ManyToOne
    private VaccinePlace vaccinePlace;

    @ManyToOne
    private Passport passport;

}
