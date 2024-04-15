package com.example.animal_travel.repository;

import com.example.animal_travel.entity.Animal;
import com.example.animal_travel.entity.Travel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TravelRepository extends JpaRepository<Travel, Long> {
    public List<Travel> findAllByAnimalIn(List<Animal> animals);
    public List<Travel> findAllByAnimalInOrderById(List<Animal> animals);
}
