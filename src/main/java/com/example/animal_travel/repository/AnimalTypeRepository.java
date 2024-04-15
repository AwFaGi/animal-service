package com.example.animal_travel.repository;

import com.example.animal_travel.entity.AnimalType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalTypeRepository extends JpaRepository<AnimalType, Long> {
    AnimalType findFirstByName(String name);
    boolean existsAnimalTypeByNameEqualsIgnoreCase(String name);
    List<AnimalType> findAllBy();
}
