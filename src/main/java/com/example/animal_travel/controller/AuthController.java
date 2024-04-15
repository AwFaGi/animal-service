package com.example.animal_travel.controller;

import com.example.animal_travel.data.to.JwtDTO;
import com.example.animal_travel.data.from.LoginUserDTO;
import com.example.animal_travel.data.from.RegisterUserDTO;
import com.example.animal_travel.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@Validated @RequestBody LoginUserDTO userDTO){

        JwtDTO result = userService.loginUser(userDTO);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }

    }

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> register(@Validated @RequestBody RegisterUserDTO userDTO){

        JwtDTO result = userService.registerUser(userDTO);

        if (result.isError()){
            return ResponseEntity.badRequest().body(result);
        } else {
            return ResponseEntity.ok(result);
        }

    }
}