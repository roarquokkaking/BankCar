package choice.controller;

import car.entity.Car;
import choice.service.ChoiceService;
import login.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import review.entity.ReviewEntity;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/choice", produces = "application/json")
public class ChoiceController {
    @Autowired
    private ChoiceService choiceService;

    @GetMapping("/carinfo")
    public Car choiceData(@RequestParam(name = "carId") Long carId) {
        System.out.println("************carid************ = "+carId);
        Car carInfo = choiceService.getCarInfo(carId);
        System.out.println("************carinfo************ = "+carInfo);
        carInfo.setWishLists(null);
        if (carInfo.getUser() == null) {
            throw new IllegalArgumentException("User not found for car");
        }
        return carInfo;
    }

//    @GetMapping("/carinfo")
//    public Optional<CarDTO> choiceData(@RequestParam(name = "carId") Long carId) {
//        System.out.println("************carid************ = "+carId);
//        Optional<CarDTO> carInfo = choiceService.getCarInfo(carId);
//        System.out.println("************carinfo************ = "+carInfo);
//        if (carInfo.getUser() == null) {
//            throw new IllegalArgumentException("User not found for car");
//        }
//        return carInfo;
//    }
    @GetMapping("/hostinfo")
    public LoginDTO hostInfo(@RequestParam(name = "userId") String userId) {
        System.out.println("************userId************ = " + userId);
        LoginDTO hostInfo = choiceService.getHostInfo(userId);
        System.out.println("************hostinfo************ = " + hostInfo);

        return hostInfo;
    }

    @GetMapping("/reviewinfo")
    public List<ReviewEntity> reviewInfo(@RequestParam(name = "carId") Long carId) {
        System.out.println("************carid************ = " + carId);
        List<ReviewEntity> reviews = choiceService.getReviewsByCarId(carId);
        System.out.println("************reviews************ = " + reviews);

        return reviews;
    }
    
}
