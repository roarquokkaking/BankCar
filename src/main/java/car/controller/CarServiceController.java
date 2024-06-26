package car.controller;

import car.bean.CarResponseDTO;
import car.bean.ServiceCarDTO;
import car.entity.Car;
import car.entity.CarImages;
import car.entity.ServiceCar;
import car.repo.ServiceCarRepository;
import car.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/api")
public class CarServiceController {
    @Autowired
    private CarService carService;
    @Autowired
    private ServiceCarRepository serviceCarRepository;

    // 자동차 서비스 등록 api
    @PostMapping(path = "/cars/{carId}/service")
    public ResponseEntity<ServiceCar> insertCarService(@PathVariable Long carId,
                                                       @RequestBody ServiceCarDTO serviceCarDTO){
        System.out.println("CarServiceController start");
        Car car = carService.findCarById(carId);
        ServiceCar serviceCar = new ServiceCar();
        serviceCar.setCar(car);
        serviceCar.setStartDate(serviceCarDTO.getStartDate());
        serviceCar.setEndDate(serviceCarDTO.getEndDate());
        serviceCar.setStartTime(serviceCarDTO.getStartTime());
        serviceCar.setEndTime(serviceCarDTO.getEndTime());

        ServiceCar saveServiceCar = carService.saveServiceCar(serviceCar);

        return ResponseEntity.ok(saveServiceCar);
    }


    @GetMapping(path = "/cars/getcardata")
    public List<Object[]> getcardata(){
        return carService.getCarData();
    }


}
