package com.example.animal_travel.repository;

import com.example.animal_travel.entity.TravelPlace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TravelPlaceRepository extends JpaRepository<TravelPlace, Long> {
    TravelPlace findFirstByName(String name);
    TravelPlace findFirstByNameEqualsIgnoreCase(String name);
    boolean existsTravelPlaceByNameEqualsIgnoreCase(String name);
    List<TravelPlace> findAllBy();
}
