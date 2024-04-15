package com.example.animal_travel.repository;

import com.example.animal_travel.entity.Citizenship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CitizenshipRepository extends JpaRepository<Citizenship, Long> {
    Citizenship findFirstByName(String name);
    boolean existsCountryByNameEqualsIgnoreCase(String name);
    List<Citizenship> findAllBy();
}
