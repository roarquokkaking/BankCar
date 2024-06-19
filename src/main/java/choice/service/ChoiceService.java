package choice.service;

import choice.dto.CombineDTO;

import java.util.List;

public interface ChoiceService {

    CombineDTO getCarInfo(Long carId);

    List<CombineDTO> getReviewsByCarId(Long carId);

    CombineDTO getUserInfo(String userId);
}
