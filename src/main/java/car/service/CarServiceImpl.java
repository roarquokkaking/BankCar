package car.service;

import car.entity.Car;
import car.entity.CarImages;
import car.entity.ServiceCar;
import car.repo.CarImageRepository;
import car.repo.CarRepository;
import car.repo.ServiceCarRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {
    @Autowired
    private CarRepository carRepository;
    @Autowired
    private CarImageRepository carImageRepository;
    @Autowired
    private ServiceCarRepository serviceCarRepository;

    @Override
    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    @Override
    public void saveCarImages(CarImages carImages, List<String> carImagesUUID) {

        if(carImagesUUID.size() > 0) carImages.setMain_image(carImagesUUID.get(0));
        if(carImagesUUID.size() > 1) carImages.setImage1(carImagesUUID.get(1));
        if(carImagesUUID.size() > 2) carImages.setImage2(carImagesUUID.get(2));
        if(carImagesUUID.size() > 3) carImages.setImage3(carImagesUUID.get(3));
        if(carImagesUUID.size() > 4) carImages.setImage3(carImagesUUID.get(4));

        carImageRepository.save(carImages);
    }

    @Override
    public ServiceCar saveServiceCar(ServiceCar serviceCar) {
        return serviceCarRepository.save(serviceCar);
    }

    @Override
    public Car findCarById(Long carId) {
        return carRepository.findById(carId)
                .orElseThrow(() -> new EntityNotFoundException("Car entity not found with id: " + carId));
    }

    @Override
    public List<Car> getCarsByUserId(String userId) {
       return carRepository.getCarsByUserId(userId);
    }

    @Override
    public CarImages getCarImagesByCarId(Long carId) {
        return carImageRepository.findById(carId)
                .orElseThrow(() -> new EntityNotFoundException("carImages entity not found with id: " + carId));
    }

    @Override
    public List<Object[]> getCarData(String label) {

        String new_label="";
        switch (label){
            case "1" : new_label="캠핑";
                        break;
            case "2" : new_label="비지니스";
                break;
            case "3" : new_label="데이트";
                break;
            case "4" : new_label="여행";
                break;
            case "5" : new_label="스포츠카";
                break;
            case "6" : new_label="오토바이";
                break;
            case "7" : new_label="트럭";
                break;
            case "8" : new_label="전기차";
                break;
            default: new_label="";
                break;
        }
        System.out.println("new_label="+new_label);

        if(new_label.equals("")){
            return serviceCarRepository.findAllOrderByIdDesc();
        }else{
            return serviceCarRepository.findAllOrderByIdDesc(new_label);
        }

    }

    @Override
    public List<Object[]> getCarData2(String label, double latitude, double longitude) {
        return serviceCarRepository.findAllOrderByLatitudeLongitudeAndIdDesc(latitude, longitude);
    }


    @Override
    public void deleteCarByCarId(String userId, Long carId) {
        System.out.println("userId = " + userId + ", carId = " + carId);
        carRepository.deleteCarByUserIdAndCarId(userId, carId);
        serviceCarRepository.deleteAllByCarId(carId);
    }

    @Override
    public List<ServiceCar> findCarsByCarId(Long carId) {
        return serviceCarRepository.findAllByCarId(carId);
    }

}
