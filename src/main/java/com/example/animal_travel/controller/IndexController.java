package com.example.animal_travel.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping({"/","/login", "/register", "/account", "/travels", "/map", "/help"} )
    public String getIndexPage(){
        return "index.html";
    }

}