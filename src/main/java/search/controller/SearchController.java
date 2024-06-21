package search.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import search.service.SearchService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;


@CrossOrigin
@RestController
@RequestMapping(path="api/searching",produces="application/json")
public class SearchController {

  @Autowired
  SearchService searchService;
   @GetMapping("/searchList")
   public List<Long> searchCar( @RequestParam("jibunAddress") String jibunAddress,
                                   @RequestParam("roadAddress") String roadAddress,
                                   @RequestParam("x") double latitude,
                                   @RequestParam("y") double longitude,
                                   @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
                                   @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate,
                                   @RequestParam("startTime") @DateTimeFormat(pattern = "HH:mm") LocalTime startTime,
                                   @RequestParam("endTime") @DateTimeFormat(pattern = "HH:mm") LocalTime endTime,
                                   @RequestParam("minPrice") int minPrice,
                                   @RequestParam("maxPrice") int maxPrice) {
       List<Long> carIds  = searchService.searchId(startDate, endDate, startTime, endTime, minPrice, maxPrice, latitude, longitude);
       System.out.println(carIds);
       return carIds;
   }
}
