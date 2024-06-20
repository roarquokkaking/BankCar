package choice.service;

import choice.dto.CombineDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChoiceServiceImpl implements ChoiceService{
    @Override
    public CombineDTO getCarInfo(Long carId) {
        return null;
    }

    @Override
    public List<CombineDTO> getReviewsByCarId(Long carId) {
        return null;
    }

    @Override
    public CombineDTO getUserInfo(String userId) {
        return null;
    }
}
