package car.controller;

import car.entity.Car;
import car.service.CarRegistrationService;
import driverLicense.service.ObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
public class CarRegistrationController {
    @Autowired
    private CarRegistrationService carRegistrationService;
    @Autowired
    private ObjectStorageService objectStorageService;

    @PostMapping(path = "/cars")
    public ResponseEntity<Car> createCar(@RequestPart("car") Car car,
                                         @RequestPart("images") List<MultipartFile> images) {
        System.out.println("CarController start");
        Car savedCar = carRegistrationService.saveCar(car);
        //carRegistrationService.saveCarImages(savedCar.getCarId(), );

        for(MultipartFile image : images){
            String uploadFileName = objectStorageService.uploadFile("cars/" + savedCar.getCarId() + "/", image);
            System.out.println("uploadFileName = " + uploadFileName);
        }
        return ResponseEntity.ok(savedCar);
    }


}
