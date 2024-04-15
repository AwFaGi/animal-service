package com.example.animal_travel;

import com.example.animal_travel.service.SampleDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class AnimalTravelApplication implements CommandLineRunner {

    private final SampleDataService dataService;

    public static void main(String[] args) {
        SpringApplication.run(AnimalTravelApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        dataService.insertDefaultValues();
    }
}
