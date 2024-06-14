package car.controller;

import car.entity.Car;
import car.entity.CarImages;
import car.service.CarRegistrationService;
import driverLicense.service.ObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class CarRegistrationController {
    @Autowired
    private CarRegistrationService carRegistrationService;
    @Autowired
    private ObjectStorageService objectStorageService;
    private List<String> carImagesUUID = new ArrayList<>();

    @PostMapping(path = "/cars")
    public ResponseEntity<Car> createCar(@RequestPart("car") Car car,
                                         @RequestPart("images") List<MultipartFile> images) {
        System.out.println("CarController start");
        Car savedCar = carRegistrationService.saveCar(car);     // 자동차 저장
        CarImages carImages = new CarImages();
        carImages.setCar(savedCar);                             // Car 엔티티를 연결

        for(MultipartFile image: images){
            String uploadFileName = objectStorageService.uploadFile("cars/" + savedCar.getCarId() + "/", image);
            carImagesUUID.add(uploadFileName);
            System.out.println("uploadFileName = " + uploadFileName);
        }

        // car images uuid 값들을 저장
        carRegistrationService.saveCarImages(carImages, carImagesUUID);
        return ResponseEntity.ok(savedCar);
    }


}
