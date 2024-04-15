package com.example.animal_travel.service;

import com.example.animal_travel.data.from.TravelDTO;
import com.example.animal_travel.data.from.TravelUpdateDTO;
import com.example.animal_travel.data.to.MessageDTO;
import com.example.animal_travel.entity.Animal;
import com.example.animal_travel.entity.Travel;
import com.example.animal_travel.repository.AnimalRepository;
import com.example.animal_travel.repository.TravelPlaceRepository;
import com.example.animal_travel.repository.TravelRepository;
import com.example.animal_travel.repository.TravelTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TravelService {
    private final UserService userService;
    private final AnimalRepository animalRepository;
    private final TravelRepository travelRepository;
    private final TravelTypeRepository travelTypeRepository;
    private final TravelPlaceRepository travelPlaceRepository;
    public List<Travel> getAllTravels() {
        String username = userService.extractUsername();
        return travelRepository.findAllByAnimalInOrderById(animalRepository.findAllByUser_UsernameOrderById(username));
    }

    public MessageDTO addTravel(TravelDTO travelDTO) {

        if (!travelPlaceRepository.existsTravelPlaceByNameEqualsIgnoreCase(travelDTO.getFrom())){
            return new MessageDTO(true, "Неизвестное место отправления");
        }

        if (!travelPlaceRepository.existsTravelPlaceByNameEqualsIgnoreCase(travelDTO.getTo())){
            return new MessageDTO(true, "Неизвестное место отправления");
        }

        if (!travelTypeRepository.existsTravelTypeByNameEqualsIgnoreCase(travelDTO.getTravelType())){
            return new MessageDTO(true, "Неизвестный тип поездки");
        }

        if (!animalRepository.existsById(travelDTO.getAnimalId())){
            return new MessageDTO(true, "Неизвестное животное");
        }

        Travel travel = new Travel();
        travel.setFrom(travelPlaceRepository.findFirstByNameEqualsIgnoreCase(travelDTO.getFrom()));
        travel.setTo(travelPlaceRepository.findFirstByNameEqualsIgnoreCase(travelDTO.getTo()));
        travel.setTravelType(travelTypeRepository.findFirstByNameEqualsIgnoreCase(travelDTO.getTravelType()));

        travel.setArrivalDate(travelDTO.getArrivalDate());
        travel.setDepartureDate(travelDTO.getDepartureDate());

        travel.setAnimal(animalRepository.findById(travelDTO.getAnimalId()).get());

        travelRepository.save(travel);
        return new MessageDTO(false, "Успешно добавлено");
    }

    public MessageDTO delete(long id) {
        String username = userService.extractUsername();

        if (travelRepository.findById(id).isEmpty()){
            return new MessageDTO(true, "Неизвестная поездка");
        }

        Travel travel = travelRepository.findById(id).get();

        if (!travel.getAnimal().getUser().getUsername().equals(username)){
            return new MessageDTO(true, "Это не Ваша поездка");
        }

        travelRepository.delete(travel);
        return new MessageDTO(false, "Успешно удалено");
    }

    public MessageDTO update(TravelUpdateDTO travelUpdateDTO) {
        String username = userService.extractUsername();

        if (travelRepository.findById(travelUpdateDTO.getId()).isEmpty()){
            return new MessageDTO(true, "Неизвестная поездка");
        }

        Travel travel = travelRepository.findById(travelUpdateDTO.getId()).get();

        if (!travel.getAnimal().getUser().getUsername().equals(username)){
            return new MessageDTO(true, "Это не Ваша поездка");
        }

        travel.setExpenses(travelUpdateDTO.getExpense());
        travel.setTime(travelUpdateDTO.getTime());

        travelRepository.save(travel);
        return new MessageDTO(false, "Успешно обновлено");

    }
}
