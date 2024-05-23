package search.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping(path = "detail", produces = "application/json; charset=UTF-8")
    public ResponseEntity<String> naverSearchList(@RequestParam(value="text") String text) {
        //네이버 검색 클라이언트 ID
        String clientId = "eERtooMMW67jj2cV5EyJ"; 		
        String clientSecret = "6MV3Afx8ts";

        String uri = UriComponentsBuilder
            .fromUriString("https://openapi.naver.com")
            .path("/v1/search/local.json")
            .queryParam("query", text)
            .queryParam("display", 5)
            .queryParam("start", 1)
            .queryParam("sort", "random")
            .build(true)
            .toUriString();

        WebClient webClient = WebClient.builder()
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .defaultHeader("X-Naver-Client-Id", clientId)
            .defaultHeader("X-Naver-Client-Secret", clientSecret)
            .build();

        ResponseEntity<String> responseEntity = webClient.get()
            .uri(uri)
            .retrieve()
            .toEntity(String.class)
            .block();
        
        String responseBody = responseEntity.getBody();
        return ResponseEntity.ok(responseBody);
    }
}
