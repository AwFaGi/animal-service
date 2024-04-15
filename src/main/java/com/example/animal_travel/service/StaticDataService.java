package com.example.animal_travel.service;

import com.example.animal_travel.entity.AnimalType;
import com.example.animal_travel.entity.Citizenship;
import com.example.animal_travel.entity.TravelPlace;
import com.example.animal_travel.entity.TravelType;
import com.example.animal_travel.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StaticDataService {
    private CitizenshipRepository citizenshipRepository;
    private AnimalTypeRepository animalTypeRepository;
    private TravelPlaceRepository travelPlaceRepository;
    private TravelTypeRepository travelTypeRepository;

    public List<Citizenship> getAllCitizenship(){
        return citizenshipRepository.findAll();
    }

    public List<AnimalType> getAnimalTypes(){
        return animalTypeRepository.findAll();
    }

    public List<TravelPlace> getAllTravelPlace() {
        return travelPlaceRepository.findAll();
    }

    public List<TravelType> getAllTravelType() {
        return travelTypeRepository.findAll();
    }
}
