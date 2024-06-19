package choice.controller;

import choice.dto.CombineDTO;
import choice.service.ChoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "choice", produces = "application/json")
public class ChoiceController {
    @Autowired
    ChoiceService choiceService;

    @GetMapping("/choicedata")
    public CombineDTO choiceData(@RequestParam Long carId) {
        CombineDTO carInfo = choiceService.getCarInfo(carId);
        List<CombineDTO> reviews = choiceService.getReviewsByCarId(carId);

        CombineDTO combineDTO = new CombineDTO();
        combineDTO.setCarInfo(carInfo.getCarInfo());
        combineDTO.setReviews(combineDTO.getReviews());

        String userId = combineDTO.getCarInfo().getUserId();
        CombineDTO userInfo = choiceService.getUserInfo(userId);
        combineDTO.setUserInfo(userInfo.getUserInfo());

        return combineDTO;
    }
    
}
