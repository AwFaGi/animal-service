package com.example.animal_travel.data.from;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NonNull;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
public class DocumentDTO {
    Long id = 0L;
    @NonNull
    String name;
    @NonNull
    Long animalId;
    @NonNull
    MultipartFile data;
}
