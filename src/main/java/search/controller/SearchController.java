package search.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import search.service.SearchService;

@CrossOrigin
@RestController
@RequestMapping(path="searching",produces="application/json")
public class SearchController {

    @Autowired
    SearchService searchService;

    @PostMapping("searchList")
    public ResponseEntity<Object> searchList( @RequestParam("startDate") String startDate,
                                              @RequestParam("endDate") String endDate,
                                              @RequestParam("startTime") String startTime,
                                              @RequestParam("endTime") String endTime,
                                              @RequestParam("jibunAddress") String jibunAddress,
                                              @RequestParam("roadAddress") String roadAddress,
                                              @RequestParam("x") String x,
                                              @RequestParam("y") String y,
                                              @RequestParam("minPrice") String minPrice,
                                              @RequestParam("maxPrice") String maxPrice) {
        Map<String, Object> params = new HashMap<>();
        params.put("startDate", startDate);
        params.put("endDate", endDate);
        params.put("startTime", startTime);
        params.put("endTime", endTime);
        params.put("jibunAddress", jibunAddress);
        params.put("roadAddress", roadAddress);
        params.put("x", x);
        params.put("y", y);
        params.put("minPrice", minPrice);
        params.put("maxPrice", maxPrice);

        Map<String, Object> result = searchService.search(params);
        return ResponseEntity.ok(result);
    }
    // @PostMapping("searchList")
    // public ResponseEntity<Object> searchList(@RequestBody SearchDTO searchDTO) {
    //     // 이 예제에서는 간단히 전달된 DTO를 그대로 반환하겠습니다.
    //     return ResponseEntity.ok(searchDTO);
    // }
}
