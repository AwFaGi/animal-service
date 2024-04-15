package com.example.animal_travel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "citizenship")
public class Citizenship {
    @Id
    @SequenceGenerator(name = "citizenship_id_generator", allocationSize = 1)
    @GeneratedValue(generator = "citizenship_id_generator")
    private Long id;
    private String name;
}
