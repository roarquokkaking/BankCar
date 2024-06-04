package car.service;

import car.entity.Car;
import org.springframework.web.multipart.MultipartFile;

public interface CarRegistrationService {
    Car saveCar(Car car);

    void saveCarImages(int carId, MultipartFile images);
}
