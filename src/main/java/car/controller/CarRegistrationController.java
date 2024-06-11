package car.controller;

import car.entity.Car;
import car.entity.CarImages;
import car.service.CarMachineLearningService;
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

    @Autowired
    CarMachineLearningService carMachineLearningService;

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

    // 차 가격 추천을 위한 머신러닝
    @GetMapping("/train")
    public String trainModel() {
        try {
            carMachineLearningService.trainModel();
            return "Model trained successfully";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error training model";
        }
    }

    @GetMapping("/predict")
    public double predictPrice(@RequestParam String doroAddress,
                               @RequestParam String model,
                               @RequestParam String category,
                               @RequestParam double rating) {
        try {
            return carMachineLearningService.predictPrice(doroAddress, model, category, rating);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }
}
