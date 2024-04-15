package com.example.animal_travel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vaccine_type")
public class VaccineType {
    @Id
    @SequenceGenerator(name = "vaccine_type_id_generator", allocationSize = 1)
    @GeneratedValue(generator = "vaccine_type_id_generator")
    private Long id;

    private String name;
    private int expiration;

    @ManyToOne
    private Animal animal;
}
