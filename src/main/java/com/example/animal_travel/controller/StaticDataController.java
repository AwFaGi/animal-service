package com.example.animal_travel.controller;

import com.example.animal_travel.service.AnimalService;
import com.example.animal_travel.service.StaticDataService;
import com.example.animal_travel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/staticData")
public class StaticDataController {
    private final StaticDataService staticDataService;

    @GetMapping(value = "/getAnimalTypes")
    public ResponseEntity<?> getAnimalTypes(){
        return ResponseEntity.ok(staticDataService.getAnimalTypes());
    }

    @GetMapping(value = "/getAllCitizenship")
    public ResponseEntity<?> getAllCitizenship(){
        return ResponseEntity.ok(staticDataService.getAllCitizenship());
    }

    @GetMapping(value = "/getAllTravelPlace")
    public ResponseEntity<?> getAllTravelPlace(){
        return ResponseEntity.ok(staticDataService.getAllTravelPlace());
    }

    @GetMapping(value = "/getAllTravelType")
    public ResponseEntity<?> getAllTravelType(){
        return ResponseEntity.ok(staticDataService.getAllTravelType());
    }

}
