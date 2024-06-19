package choice.service;

import choice.dto.CombineDTO;

public interface ChoiceService {

    CombineDTO getCarInfo(Long carId);

//    List<CombineDTO> getReviewsByCarId(Long carId);

    CombineDTO getUserInfo(String userId);
}
