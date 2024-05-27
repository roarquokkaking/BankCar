package search.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import search.service.SearchService;

@CrossOrigin
@RestController
@RequestMapping(path = "search", produces = "application/json")
public class SearchController {

    @Autowired
    SearchService searchService;

    @GetMapping(value = "searched")
    public String searched(@RequestParam(value = "jibunAddress") String jibunAddress,
                           @RequestParam(value = "startDate") String startDate,
                           @RequestParam(value = "endDate") String endDate,
                           @RequestParam(value = "endTime") String endTime,
                           @RequestParam(value = "startTime") String startTime, Model model) {
        
        return "/";
    }
}
