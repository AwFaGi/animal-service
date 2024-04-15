package com.example.animal_travel.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "document")
public class Document {

    @Id
    @SequenceGenerator(name = "document_id_generator", allocationSize = 1)
    @GeneratedValue(generator = "document_id_generator")
    private Long id;

    @ManyToOne
    @JsonIgnore
    private Animal animal;

    private String name;

    private byte[] data;

}
