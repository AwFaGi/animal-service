package com.example.animal_travel.data.from;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@AllArgsConstructor
public class AnimalDTO {
    Long id = 0L;
    @NonNull
    String name;
    @NonNull
    String type;
    @NonNull
    char sex;
    @NonNull
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    Date birthday;
    MultipartFile image;
}
