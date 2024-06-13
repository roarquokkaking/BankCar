package car.controller;

import car.entity.Car;
import car.entity.CarImages;
import car.service.CarService;
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
    private CarService carRegistrationService;
    @Autowired
    private ObjectStorageService objectStorageService;

    @Autowired
    private CarService carService;

    @Autowired
    CarMachineLearningService carMachineLearningService;

    @PostMapping(path = "/users/{userId}/cars", consumes = {"multipart/form-data"})
    public ResponseEntity<Car> createCar(@RequestPart("car") Car car,
                                         @RequestPart("images") List<MultipartFile> images,
                                         @PathVariable("userId") String userId) {
        System.out.println("CarController start");
        // userId와 User 엔티티 연결..


        Car savedCar = carRegistrationService.saveCar(car);     // 자동차 저장
        CarImages carImages = new CarImages();
        carImages.setCar(savedCar);                             // Car 엔티티를 연결


        List<String> carImagesUUID = new ArrayList<>();
        for(MultipartFile image: images){
            String uploadFileName = objectStorageService.uploadFile("cars/" + savedCar.getCarId() + "/", image);
            carImagesUUID.add(uploadFileName);
            System.out.println("uploadFileName = " + uploadFileName);
        }

        // car images uuid 값들을 저장
        carRegistrationService.saveCarImages(carImages, carImagesUUID);
        return ResponseEntity.ok(savedCar);
    }

    // 해당 유저의 등록된 자동차 목록을 가져오는 api
    @GetMapping(path = "/users/{userId}/cars")
    public ResponseEntity<List<CarImages>> getCarsByUserId(@PathVariable("userId") String userId){
        List<Car> carList = carService.getCarsByUserId(userId);
        if (carList.isEmpty()) {
            return ResponseEntity.notFound().build(); // 찾을 수 없는 경우 404 응답
        }

        List<CarImages> carImagesList = new ArrayList<>();
        for(Car car : carList){
            CarImages carImages = carService.getCarImagesByCarId(car.getCarId());   // 자동차 이미지 정보를 가져오는 로직
            carImagesList.add(carImages);
        }
        // CarImages 객체만 넘기면, 해당 객체에 Car 엔티티가 연관관계로 잡혀있기 때문에 Car정보와 CarImages의 정보 둘 다 넘어간다.
        return ResponseEntity.ok(carImagesList); // 찾은 경우 200 응답과 함께 자동차 및 이미지 정보 목록 반환
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
