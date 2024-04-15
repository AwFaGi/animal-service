package com.example.animal_travel.repository;

import com.example.animal_travel.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findAllByUser_UsernameOrderById(String username);
}
