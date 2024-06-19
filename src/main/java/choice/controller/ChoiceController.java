package choice.controller;

import choice.dto.CombineDTO;
import choice.service.ChoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:3000") //https://dongwoossltest.shop
@RestController
@RequestMapping(path = "choice", produces = "application/json")
public class ChoiceController {
    @Autowired
    private ChoiceService choiceService;

    @GetMapping("/choicedata")
    public CombineDTO choiceData(@RequestParam Long carId) {
        System.out.println("************carid************ = "+carId);
        CombineDTO carInfo = choiceService.getCarInfo(carId);
//        List<CombineDTO> reviews = choiceService.getReviewsByCarId(carId);

        CombineDTO combineDTO = new CombineDTO();
        combineDTO.setCarInfo(carInfo.getCarInfo());
//        combineDTO.setReviews(reviews);

        String userId = combineDTO.getCarInfo().getUserId();
        CombineDTO userInfo = choiceService.getUserInfo(userId);
        combineDTO.setUserInfo(userInfo.getUserInfo());
        System.out.println("************확인용*********** = : "+combineDTO);
        return combineDTO;
    }
    
}
