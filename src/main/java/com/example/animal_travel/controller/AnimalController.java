package com.example.animal_travel.controller;

import com.example.animal_travel.data.from.AnimalDTO;
import com.example.animal_travel.data.from.DocumentDTO;
import com.example.animal_travel.data.to.MessageDTO;
import com.example.animal_travel.service.AnimalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/animal")
public class AnimalController {

    private final AnimalService animalService;

    @GetMapping(value = "/get")
    public ResponseEntity<?> get(){
        return ResponseEntity.ok(animalService.getAllByUsername());
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> add(@ModelAttribute @Validated AnimalDTO animalDTO){
        MessageDTO result =  animalService.addAnimal(animalDTO);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }

    }

    @PostMapping(value = "/update")
    public ResponseEntity<?> update(@Validated @RequestBody AnimalDTO animalDTO){

        MessageDTO result = animalService.update(animalDTO);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }
    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable long id){

        MessageDTO result = animalService.delete(id);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }
    }

    @PostMapping(value = "/uploadDocument")
    public ResponseEntity<?> uploadDocument(@ModelAttribute @Validated DocumentDTO documentDTO){
        MessageDTO result = animalService.uploadDocument(documentDTO);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }

    }

    @PostMapping(value = "/deleteDocument/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable long id){
        MessageDTO result = animalService.deleteDocument(id);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }

    }

}
