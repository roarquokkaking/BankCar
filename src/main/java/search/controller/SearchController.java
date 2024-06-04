package search.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import search.bean.SearchDTO;
import search.service.SearchService;

@CrossOrigin
@RestController
@RequestMapping(path="searching",produces="application/json")
public class SearchController {

    @Autowired
    SearchService searchService;

    @PostMapping("searchList")
    public ResponseEntity<Object> searchList(@ModelAttribute(value="startDate") String startDate,
                        @ModelAttribute(value="endDate") String endDate,
                        @ModelAttribute(value="startTime") String startTime,
                        @ModelAttribute(value="endTime") String endTime,
                        @ModelAttribute(value="jibunAddress") String jibunAddress,
                        @ModelAttribute(value="roadAddress") String roadAddress,
                        @ModelAttribute(value="x") String x,
                        @ModelAttribute(value="y") String y, Model model) {

        model.addAttribute("startDate", startDate);
        model.addAttribute("endDate", endDate);
        model.addAttribute("startTime", startTime);
        model.addAttribute("endTime", endTime);
        model.addAttribute("jibunAddress", jibunAddress);
        System.out.println("startDate : "+ startDate);
        System.out.println("endDate : "+ endDate);
        System.out.println("startTime : "+ startTime);
        System.out.println("endTime : "+ endTime);
        System.out.println("jibunAddress : "+ jibunAddress);
        System.out.println("roadAddress : "+ roadAddress);
        System.out.println("-------------------");
        return ResponseEntity.ok().build(); // Modify to return the appropriate response
    }
    // @PostMapping("searchList")
    // public ResponseEntity<Object> searchList(@RequestBody SearchDTO searchDTO) {
    //     // 이 예제에서는 간단히 전달된 DTO를 그대로 반환하겠습니다.
    //     return ResponseEntity.ok(searchDTO);
    // }
}
