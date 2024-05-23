package choice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import choice.service.ChoiceService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@CrossOrigin
@RestController
@RequestMapping(path = "choice", produces = "application/json")

public class ChoiceController {
    @Autowired
    ChoiceService choiceService;
    
}
