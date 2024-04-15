package com.example.animal_travel.controller;

import com.example.animal_travel.data.from.LoginUserDTO;
import com.example.animal_travel.data.to.MessageDTO;
import com.example.animal_travel.data.from.PasswordChangeDTO;
import com.example.animal_travel.data.from.RegisterUserDTO;
import com.example.animal_travel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/account")
public class AccountController {

    private final UserService userService;

    @GetMapping(value = "/info")
    public ResponseEntity<?> info(){
        String username = userService.extractUsername();
        return ResponseEntity.ok(userService.findUserByUsername(username));
    }

    @PostMapping(value = "/updateInfo")
    public ResponseEntity<?> updateInfo(@Validated @RequestBody RegisterUserDTO userDTO){

        MessageDTO result = userService.updateInfo(userDTO);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }

    }

    @PostMapping(value = "/changePassword")
    public ResponseEntity<?> changePassword(@Validated @RequestBody PasswordChangeDTO passwordChangeDTO){

        MessageDTO result = userService.changePassword(passwordChangeDTO);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }

    }

    @PostMapping(value = "/delete")
    public ResponseEntity<?> delete(@Validated @RequestBody LoginUserDTO loginUserDTO){

        MessageDTO result = userService.delete(loginUserDTO);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }

    }

}
