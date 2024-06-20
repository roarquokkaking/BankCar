package choice.service;

import car.entity.Car;
import car.repo.CarRepository;
import choice.dto.CarDTO;
import choice.dto.CombineDTO;
import choice.dto.UserDTO;
import choice.repo.ChoiceRepo;
import login.dao.LoginDAO;
import login.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChoiceServiceImpl implements ChoiceService{
    private final ChoiceRepo choiceRepo;

    @Autowired
    private CarRepository carRepository;

//    @Autowired
//    private ReviewRepository reviewRepository;

    @Autowired
    private LoginDAO loginDAO;

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
        CombineDTO combineDTO = new CombineDTO();
        CarDTO carDTO = new CarDTO();
        carDTO.setCarId(car.getCarId());
        // Set other properties of carDTO
        combineDTO.setCarInfo(carDTO);
        return combineDTO;
    }

//    @Override
//    public List<CombineDTO> getReviewsByCarId(Long carId) {
//        List<ReviewEntity> reviews = reviewRepository.findByCar_CarId(carId);
//        // Convert List<ReviewEntity> to List<CombineDTO>
//        return reviews.stream().map(this::convertReviewToCombineDTO).collect(Collectors.toList());
//    }

    @Override
    public CombineDTO getUserInfo(String userId) {
        Optional<LoginDTO> userOptional = loginDAO.findById(userId);
        LoginDTO user = userOptional.orElseThrow(() -> new RuntimeException("User not found"));
        return convertUserToCombineDTO(user);
    }
    private CombineDTO convertUserToCombineDTO(LoginDTO user) {
        CombineDTO combineDTO = new CombineDTO();
        // Assuming you have a UserDTO class to map LoginDTO to DTO
        combineDTO.setUserInfo(mapLoginDTOToUserDTO(user));
        return combineDTO;
    }

    private UserDTO mapLoginDTOToUserDTO(LoginDTO loginDTO) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(loginDTO.getId());
        userDTO.setEmail(loginDTO.getEmail());
        userDTO.setName(loginDTO.getName());
        userDTO.setDriver(loginDTO.isDriver());
        userDTO.setProfileImage(loginDTO.getProfile_image());
        // Map other fields as needed
        return userDTO;
    }

}
