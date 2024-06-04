package car.service;

import car.entity.Car;
import car.repo.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CarRegistrationServiceImpl implements CarRegistrationService{
    @Autowired
    private CarRepository carRepository;
    @Override
    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    @Override
    public void saveCarImages(int carId, MultipartFile images) {

    }
}
