package car.service;

import car.entity.Car;
import car.entity.CarImages;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarRegistrationService {
    Car saveCar(Car car);

    void saveCarImages(CarImages carImages, List<String> carImagesUUID);
}
