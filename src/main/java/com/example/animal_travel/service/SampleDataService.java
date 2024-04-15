package com.example.animal_travel.service;

import com.example.animal_travel.entity.AnimalType;
import com.example.animal_travel.entity.Citizenship;
import com.example.animal_travel.entity.TravelPlace;
import com.example.animal_travel.entity.TravelType;
import com.example.animal_travel.repository.AnimalTypeRepository;
import com.example.animal_travel.repository.CitizenshipRepository;
import com.example.animal_travel.repository.TravelPlaceRepository;
import com.example.animal_travel.repository.TravelTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SampleDataService {
    private CitizenshipRepository citizenshipRepository;
    private AnimalTypeRepository animalTypeRepository;
    private TravelPlaceRepository travelPlaceRepository;
    private TravelTypeRepository travelTypeRepository;

    public void insertDefaultValues(){
        String[] citizenshipList = new String[]{"Россия", "США", "Китай", "Иное"};
        String[] animalTypes = new String[]{"Кот", "Собака", "Волк", "Иное"};
        String[] travelPlaces = new String[]{"Санкт-Петербург","Москва","Париж","Рим"};
        String[] travelTypes = new String[]{"Заграницу","Между городами","На поезде","На машине"};

        for (String citizenshipName :
                citizenshipList) {
            Citizenship citizenship = new Citizenship();
            citizenship.setName(citizenshipName);
            if (!citizenshipRepository.existsCountryByNameEqualsIgnoreCase(citizenshipName))
                citizenshipRepository.save(citizenship);
        }

        for (String animalTypeName :
                animalTypes) {
            AnimalType animalType = new AnimalType();
            animalType.setName(animalTypeName);
            animalType.setDescription("Описание для: " + animalTypeName);
            if (!animalTypeRepository.existsAnimalTypeByNameEqualsIgnoreCase(animalTypeName))
                animalTypeRepository.save(animalType);
        }

        for (String travelPlaceName :
                travelPlaces) {
            TravelPlace travelPlace = new TravelPlace();
            travelPlace.setName(travelPlaceName);
            if (!travelPlaceRepository.existsTravelPlaceByNameEqualsIgnoreCase(travelPlaceName))
                travelPlaceRepository.save(travelPlace);
        }

        for (String travelTypeName :
                travelTypes) {
            TravelType travelType = new TravelType();
            travelType.setName(travelTypeName);
            travelType.setPlan(
                    String.format(
                            "Задание 1 для %s\nЗадание 2 для %s\nЗадание 3 для %s",
                            travelTypeName, travelTypeName, travelTypeName
                    )
            );
            if (!travelTypeRepository.existsTravelTypeByNameEqualsIgnoreCase(travelTypeName))
                travelTypeRepository.save(travelType);
        }

    }

}
