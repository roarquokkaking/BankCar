//package main.controller;
//
//import lombok.RequiredArgsConstructor;
//import main.dto.HomeDTO;
//import main.service.MainService;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RequiredArgsConstructor
//@RestController
//@CrossOrigin
//public class MainPageController {
//
//    private final MainService mainService;
//
//    @GetMapping(path = "/home")
//    public List<HomeDTO> home (@ModelAttribute HomeDTO homeDTO) {
//        return mainService.getHomeData(homeDTO);
//    }
//}
