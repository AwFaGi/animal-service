package com.example.animal_travel.controller;

import com.example.animal_travel.data.from.AnimalDTO;
import com.example.animal_travel.data.from.TravelDTO;
import com.example.animal_travel.data.from.TravelUpdateDTO;
import com.example.animal_travel.data.to.MessageDTO;
import com.example.animal_travel.service.TravelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/travel")
public class TravelController {

    private final TravelService travelService;

    @GetMapping(value = "/get")
    public ResponseEntity<?> get(){
        return ResponseEntity.ok(travelService.getAllTravels());
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> add(@Validated @RequestBody TravelDTO travelDTO){
        MessageDTO result =  travelService.addTravel(travelDTO);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }
    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable long id){

        MessageDTO result = travelService.delete(id);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }
    }

    @PostMapping(value = "/update")
    public ResponseEntity<?> delete(@Validated @RequestBody TravelUpdateDTO travelUpdateDTO){

        MessageDTO result = travelService.update(travelUpdateDTO);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }
    }

}
