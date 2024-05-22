package login.controller;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@CrossOrigin    // 다른 포트에서 넘오는 것을 받을 수 있다.
@RestController
@RequestMapping(path = "login", produces = "application/json")
public class LoginController {
    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping(path = "google")
    public void google(@RequestParam String code){
        System.out.println("code="+code);
        String accessToken=getAccessToken(code);
        System.out.println("accessToken="+accessToken);
        JsonNode userResourceNode = getUserResource(accessToken);
        System.out.println("userResourceNode = " + userResourceNode);
        String id = userResourceNode.get("id").asText();
        String email = userResourceNode.get("email").asText();
        String nickname = userResourceNode.get("name").asText();
        System.out.println("id = " + id);
        System.out.println("email = " + email);
        System.out.println("nickname = " + nickname);
    }

    private String getAccessToken(String authorizationCode) {
        String clientId = "601610993000-u4u34s3r1op37juvet6fmr0hee3e3u1d.apps.googleusercontent.com";
        String clientSecret = "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";
        String redirectUri = "http://localhost:8080/login/google" ;
        String tokenUri = "https://oauth2.googleapis.com/token";

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params, headers);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();
        return accessTokenNode.get("access_token").asText();
    }
    private JsonNode getUserResource(String accessToken) {
        String resourceUri = "https://www.googleapis.com/oauth2/v2/userinfo";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUri, HttpMethod.GET, entity, JsonNode.class).getBody();
    }
}
