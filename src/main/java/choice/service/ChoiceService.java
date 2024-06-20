package choice.service;

import car.entity.Car;
import login.dto.LoginDTO;
import review.entity.ReviewEntity;

import java.util.List;

public interface ChoiceService {

    Car getCarInfo(Long carId);

    LoginDTO getHostInfo(String userId);

    List<ReviewEntity> getReviewsByCarId(Long carId);
}
