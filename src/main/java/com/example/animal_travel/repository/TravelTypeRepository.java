package com.example.animal_travel.repository;

import com.example.animal_travel.entity.TravelType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TravelTypeRepository extends JpaRepository<TravelType, Long> {
    boolean existsTravelTypeByNameEqualsIgnoreCase(String string);
    TravelType findFirstByNameEqualsIgnoreCase(String travelType);
}
