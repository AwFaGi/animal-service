package com.example.animal_travel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "animal_type")
public class AnimalType {
    @Id
    @SequenceGenerator(name = "animal_type_id_generator", allocationSize = 1)
    @GeneratedValue(generator = "animal_type_id_generator")
    private Long id;
    private String name;
    private String description;

}
