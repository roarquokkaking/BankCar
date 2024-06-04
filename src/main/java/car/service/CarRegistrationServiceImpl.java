package car.service;

import car.entity.Car;
import car.entity.CarImages;
import car.repo.CarImageRepository;
import car.repo.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class CarRegistrationServiceImpl implements CarRegistrationService{
    @Autowired
    private CarRepository carRepository;
    @Autowired
    private CarImageRepository carImageRepository;

    @Override
    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    @Override
    public void saveCarImages(CarImages carImages, List<String> carImagesUUID) {

        if(carImagesUUID.size() > 0) carImages.setImage1(carImagesUUID.get(0));
        else if(carImagesUUID.size() > 1) carImages.setImage2(carImagesUUID.get(1));
        else if(carImagesUUID.size() > 2) carImages.setImage3(carImagesUUID.get(2));
        else if(carImagesUUID.size() > 3) carImages.setImage4(carImagesUUID.get(3));

        carImageRepository.save(carImages);
    }


}
