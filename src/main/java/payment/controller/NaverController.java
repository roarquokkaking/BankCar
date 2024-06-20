package payment.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import payment.service.NaverService;

// https://lims-dev.tistory.com/34
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "payment", produces = "application/json")
public class NaverController {
    @Autowired
    private NaverService naverService;
    
    @GetMapping("/naver")
    @ResponseBody
    public Map<String,Object> naverPay(@RequestParam Map<String,Object> param) {
        Map<String,Object> res = naverService.naverPay(param);
        return res;
    }
    
}
