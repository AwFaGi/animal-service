package com.example.animal_travel.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_table")
public class User {
    @Id
    @SequenceGenerator(name = "user_id_generator", allocationSize = 1)
    @GeneratedValue(generator = "user_id_generator")
    private Long id;

    private String username;
    @JsonIgnore
    private String password;
    private String fio;
    private String email;
    private String phone;

    @ManyToOne
    private Citizenship citizenship;

    @OneToMany(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY, mappedBy = "user")
    @JsonIgnore
    private List<Animal> animalList;
}