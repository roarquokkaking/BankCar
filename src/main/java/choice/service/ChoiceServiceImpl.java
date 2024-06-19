package choice.service;

import car.entity.Car;
import car.repo.CarRepository;
import choice.dto.CombineDTO;
import choice.repo.ChoiceRepo;
import login.dao.LoginDAO;
import login.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChoiceServiceImpl implements ChoiceService{
    private final ChoiceRepo choiceRepo;

    @Autowired
    private CarRepository carRepository;

//    @Autowired
//    private ReviewRepository reviewRepository;

    @Autowired
    private LoginDAO userRepository;

    public ChoiceServiceImpl(ChoiceRepo choiceRepo) {
        this.choiceRepo = choiceRepo;
    }

    @Override
    public CombineDTO getCarInfo(Long carId) {
        Car car = carRepository.findByCarId(carId);
        if (car == null) {
            throw new RuntimeException("Car not found");
        }
        return convertCarToCombineDTO(car);
    }

    private CombineDTO convertCarToCombineDTO(Car car) {
        CombineDTO dto = new CombineDTO();
        // Conversion logic from Car to CombineDTO
        return dto;
    }

//    @Override
//    public List<CombineDTO> getReviewsByCarId(Long carId) {
//        List<ReviewEntity> reviews = reviewRepository.findByCar_CarId(carId);
//        // Convert List<ReviewEntity> to List<CombineDTO>
//        return reviews.stream().map(this::convertReviewToCombineDTO).collect(Collectors.toList());
//    }

    @Override
    public CombineDTO getUserInfo(String userId) {
        LoginDTO user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        // Convert User entity to CombineDTO
        return convertUserToCombineDTO(user);
    }

    private CombineDTO convertUserToCombineDTO(LoginDTO user) {
        CombineDTO dto = new CombineDTO();
        // Conversion logic from Car to CombineDTO
        return dto;
    }

}
