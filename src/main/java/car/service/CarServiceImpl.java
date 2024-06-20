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
    public List<Object[]> getCarData() {
        return serviceCarRepository.findAllOrderByIdDesc();
    }


}
