package search.controller;

import java.time.*;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import car.entity.Car;
import main.dto.HomeDTO;
import search.service.SearchService;

@CrossOrigin
@RestController
@RequestMapping(path="searching",produces="application/json")
public class SearchController {

   @Autowired
   SearchService searchService;

//    @PostMapping("searchList")
//    public ResponseEntity<Object> searchList( @RequestParam("startDate") String startDate,
//                                              @RequestParam("endDate") String endDate,
//                                              @RequestParam("startTime") String startTime,
//                                              @RequestParam("endTime") String endTime,
//                                              @RequestParam("jibunAddress") String jibunAddress,
//                                              @RequestParam("roadAddress") String roadAddress,
//                                              @RequestParam("x") String x,
//                                              @RequestParam("y") String y,
//                                              @RequestParam("minPrice") String minPrice,
//                                              @RequestParam("maxPrice") String maxPrice) {
//        Map<String, Object> params = new HashMap<>();
//        params.put("startDate", startDate);
//        params.put("endDate", endDate);
//        params.put("startTime", startTime);
//        params.put("endTime", endTime);
//        params.put("jibunAddress", jibunAddress);
//        params.put("roadAddress", roadAddress);
//        params.put("x", x);
//        params.put("y", y);
//        params.put("minPrice", minPrice);
//        params.put("maxPrice", maxPrice);
//
//        Map<String, Object> result = searchService.search(params);
//        return ResponseEntity.ok(params);
//    }
    // @PostMapping("searchList")
    // public ResponseEntity<Object> searchList(@RequestBody SearchDTO searchDTO) {
    //     // 이 예제에서는 간단히 전달된 DTO를 그대로 반환하겠습니다.
    //     return ResponseEntity.ok(searchDTO);
    // }

    @GetMapping("/searchList")
    public List<HomeDTO> searchCar( @RequestParam("jibunAddress") String jibunAddress,
                                    @RequestParam("roadAddress") String roadAddress,
                                    @RequestParam("x") String x,
                                    @RequestParam("y") String y,
                                    @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                    @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
                                    @RequestParam("startTime") @DateTimeFormat(pattern = "HH:mm") LocalTime startTime,
                                    @RequestParam("endTime") @DateTimeFormat(pattern = "HH:mm") LocalTime endTime,
                                    @RequestParam("minPrice") int minPrice,
                                    @RequestParam("maxPrice") int maxPrice) {
        List<Long> carIds  = searchService.searchId(startDate, endDate, startTime, endTime, minPrice, maxPrice);
        System.out.println(carIds);
        return searchService.searchCar(carIds);
    }
}
