package car.controller;

import car.bean.ServiceCarDTO;
import car.entity.Car;
import car.entity.ServiceCar;
import car.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins= {"http://localhost:3000", "https://dongwoossltest.shop"})
@RestController
@RequestMapping(path = "/api")
public class CarServiceController {
    @Autowired
    private CarService carService;

    // 자동차 서비스 등록 api
    @PostMapping(path = "/cars/{carId}/service")
    public ResponseEntity<ServiceCar> insertCarService(@PathVariable(value = "carId") Long carId,
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
    public List<Object[]> getcardata(@RequestParam(name="label") String label,
                                     @RequestParam(name="lat") double latitude,
                                     @RequestParam(name="lng") double longitude){
        return carService.getCarData(label, latitude, longitude);
    }

//    @GetMapping(path = "/cars/getcardata2")
//    public List<Object[]> getcardata(@RequestParam(name="label") String label,
//                                     @RequestParam(name="lat") double latitude,
//                                     @RequestParam(name="lng") double longitude){
//        return carService.getCarData2(label, latitude, longitude);
//    }

}
