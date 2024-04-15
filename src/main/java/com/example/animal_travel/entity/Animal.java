package com.example.animal_travel.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "animal")
public class Animal {
    @Id
    @SequenceGenerator(name = "animal_id_generator", allocationSize = 1)
    @GeneratedValue(generator = "animal_id_generator")
    private Long id;

    private String name;

    @ManyToOne
    private AnimalType animalType;

    private char sex;
    private Date dateOfBirth;

    @ManyToOne
    @JsonIgnore
    private User user;

    private byte[] image;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "animal", cascade = CascadeType.REMOVE)
    private List<Document> documents;

    @OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, mappedBy = "animal")
    @JsonIgnore
    private List<Travel> travels;
}
