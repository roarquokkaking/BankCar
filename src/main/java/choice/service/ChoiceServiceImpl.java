package choice.service;

import car.entity.Car;
import car.repo.CarRepository;
import login.dao.LoginDAO;
import login.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import review.entity.ReviewEntity;
import review.repository.ReviewRepository;

import java.util.List;

@Service
public class ChoiceServiceImpl implements ChoiceService{
//    private final ChoiceRepo choiceRepo;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private LoginDAO loginDAO;

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Car getCarInfo(Long carId) {
//        return carRepository.findCarWithoutWishLists(carId);
        return carRepository.findById(carId).orElseThrow(() -> new IllegalArgumentException("Invalid host ID"));

    }
//    public Optional<CarDTO> getCarInfo(Long carId) {
//        return Optional.ofNullable(carRepository.findCarWithoutWishLists(carId).orElseThrow(() -> new IllegalArgumentException("Invalid car ID")));
//    }

    @Override
    public LoginDTO getHostInfo(String userId) {
        return loginDAO.findById(userId).orElseThrow(() -> new IllegalArgumentException("Invalid host ID"));
    }

    @Override
    public List<ReviewEntity> getReviewsByCarId(Long carId) {
        return reviewRepository.findByCar_CarId(carId);
    }

}
