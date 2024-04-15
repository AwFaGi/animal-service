package com.example.animal_travel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "passport")
public class Passport {
    @Id
    @SequenceGenerator(name = "passport_id_generator", allocationSize = 1)
    @GeneratedValue(generator = "passport_id_generator")
    private Long id;

    @OneToOne
    private Animal animal;
}
