package login.service;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpSession;
import login.dao.LoginDAO;
import login.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Transactional
@Service
public class KakaoLoginServiceImpl implements KakaoLoginService {
    private final RestTemplate restTemplate = new RestTemplate();
    @Autowired
    LoginDAO loginDAO;

    @Override
    public void kakaoLogin(String code, HttpSession session) {
        String accessToken = getAccessToken(code);
        JsonNode userResourceNode = getUserResource(accessToken);
        System.out.println("userResourceNode = " + userResourceNode);
        System.out.println("kakao login");

        if (userResourceNode == null) {
            throw new RuntimeException("Failed to fetch user information from Kakao API");
        }

        JsonNode kakaoAccountNode = userResourceNode.get("kakao_account");
        JsonNode profileNode = kakaoAccountNode != null ? kakaoAccountNode.get("profile") : null;

        String id = userResourceNode.get("id") != null ? userResourceNode.get("id").asText() : null;
        String name = profileNode != null && profileNode.get("nickname") != null ? profileNode.get("nickname").asText() : null;  // Fetching name as nickname
        String email = kakaoAccountNode != null && kakaoAccountNode.get("email") != null ? kakaoAccountNode.get("email").asText() : null;

        if (id == null || name == null || email == null) {
            throw new RuntimeException("Failed to fetch required user information from Kakao API");
        }

        String isExistId = isExistId(id);
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setId(id);
        loginDTO.setEmail(email);
        loginDTO.setName(name);

        if (isExistId.equals("exist")) {
            System.out.println("이미 존재한 회원");
        } else {
            insertUser(loginDTO);
            System.out.println("회원가입 완료");
        }

        session.setAttribute("loginDTO", loginDTO);
    }

    @Override
    public String isExistId(String id) {
        Optional<LoginDTO> loginDTO = loginDAO.findById(id);
        return loginDTO.isPresent() ? "exist" : "non_exist";
    }

    @Override
    public void insertUser(LoginDTO loginDTO) {
        loginDAO.save(loginDTO);
    }

    private String getAccessToken(String authorizationCode) {
        String clientId = "f71b69bb47cf0fff57324d35d3a3ae0f";
        String redirectUri = "http://localhost:8080/login/kakao";
        String tokenUri = "https://kauth.kakao.com/oauth/token";

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);
        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity, JsonNode.class);
        JsonNode accessTokenNode = responseNode.getBody();
        return accessTokenNode != null ? accessTokenNode.get("access_token").asText() : null;
    }

    private JsonNode getUserResource(String accessToken) {
        String resourceUri = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(resourceUri, HttpMethod.GET, entity, JsonNode.class);
        return responseNode.getBody();
    }
}
