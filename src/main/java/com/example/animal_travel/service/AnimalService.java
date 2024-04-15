package com.example.animal_travel.service;

import com.example.animal_travel.data.from.AnimalDTO;
import com.example.animal_travel.data.from.DocumentDTO;
import com.example.animal_travel.data.to.JwtDTO;
import com.example.animal_travel.data.to.MessageDTO;
import com.example.animal_travel.entity.Animal;
import com.example.animal_travel.entity.AnimalType;
import com.example.animal_travel.entity.Document;
import com.example.animal_travel.entity.User;
import com.example.animal_travel.repository.AnimalRepository;
import com.example.animal_travel.repository.AnimalTypeRepository;
import com.example.animal_travel.repository.DocumentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
public class AnimalService {
    private final UserService userService;
    private final AnimalRepository animalRepository;
    private final AnimalTypeRepository animalTypeRepository;
    private final DocumentRepository documentRepository;

    public List<Animal> getAllByUsername(){
        String username = userService.extractUsername();
        return animalRepository.findAllByUser_UsernameOrderById(username);
    }

    public MessageDTO addAnimal(AnimalDTO animalDTO){
        String username = userService.extractUsername();

        if (!animalTypeRepository.existsAnimalTypeByNameEqualsIgnoreCase(animalDTO.getType())){
            return new MessageDTO(true, "Неизвестный вид животного");
        }

        Animal animal = new Animal();
        animal.setName(animalDTO.getName());
        animal.setAnimalType(animalTypeRepository.findFirstByName(animalDTO.getType()));
        animal.setSex(animalDTO.getSex());
        animal.setDateOfBirth(animalDTO.getBirthday());

        if (animalDTO.getImage() != null){
            try {
                animal.setImage(animalDTO.getImage().getBytes());
            } catch (Exception e){
                e.printStackTrace();
            }
        }

        animal.setUser(userService.findUserByUsername(username));

        animalRepository.save(animal);
        return new MessageDTO(false, "Успешно добавлено");

    }

    public MessageDTO update(AnimalDTO animalDTO) {
        String username = userService.extractUsername();

        if (animalRepository.findById(animalDTO.getId()).isEmpty()){
            return new MessageDTO(true, "Неизвестное животное");
        }

        Animal animal = animalRepository.findById(animalDTO.getId()).get();

        if (!animal.getUser().getUsername().equals(username)){
            return new MessageDTO(true, "Это не ваше животное");
        }

        animal.setName(animalDTO.getName());
        if (!animalTypeRepository.existsAnimalTypeByNameEqualsIgnoreCase(animalDTO.getType())){
            return new MessageDTO(true, "Неизвестный вид животного");
        }
        animal.setAnimalType(animalTypeRepository.findFirstByName(animalDTO.getType()));
        animal.setSex(animalDTO.getSex());
        animal.setDateOfBirth(animalDTO.getBirthday());

        animalRepository.save(animal);
        return new MessageDTO(false, "Успешно изменено");
    }

    public MessageDTO delete(long id) {
        String username = userService.extractUsername();

        if (animalRepository.findById(id).isEmpty()){
            return new MessageDTO(true, "Неизвестное животное");
        }

        Animal animal = animalRepository.findById(id).get();

        if (!animal.getUser().getUsername().equals(username)){
            return new MessageDTO(true, "Это не ваше животное");
        }

        animalRepository.delete(animal);
        return new MessageDTO(false, "Успешно удалено");

    }

    public MessageDTO uploadDocument(DocumentDTO documentDTO) {
        String username = userService.extractUsername();

        if (animalRepository.findById(documentDTO.getAnimalId()).isEmpty()){
            return new MessageDTO(true, "Неизвестное животное");
        }

        Animal animal = animalRepository.findById(documentDTO.getAnimalId()).get();

        if (!animal.getUser().getUsername().equals(username)){
            return new MessageDTO(true, "Это не Ваше животное");
        }

        Document document = new Document();
        document.setAnimal(animal);
        document.setName(documentDTO.getName());

        try {
            document.setData(documentDTO.getData().getBytes());
            documentRepository.save(document);

            return new MessageDTO(false, "Успешно загружено");

        } catch (Exception e){
            e.printStackTrace();

            return new MessageDTO(true, "Ошибка при загрузке");

        }

    }

    public MessageDTO deleteDocument(long id) {
        String username = userService.extractUsername();

        if (documentRepository.findById(id).isEmpty()){
            return new MessageDTO(true, "Неизвестный документ");
        }

        Document document = documentRepository.findById(id).get();

        if (!document.getAnimal().getUser().getUsername().equals(username)){
            return new MessageDTO(true, "Это не Ваш документ");
        }

        documentRepository.delete(document);
        return new MessageDTO(false, "Успешно удалено");

    }
}
