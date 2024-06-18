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

import javax.swing.text.StyledEditorKit;
import java.util.Optional;

@Transactional
@Service
public class LoginServiceImpl implements LoginService{
    private final RestTemplate restTemplate = new RestTemplate();
    private boolean driverYN;
    @Autowired
    LoginDAO loginDAO;
    @Override
    public void googleLogin(String code, HttpSession session) {
        String accessToken=getAccessToken(code);
        JsonNode userResourceNode = getUserResource(accessToken);
        System.out.println("userResourceNode = " + userResourceNode);
        System.out.println("google login");
        String id = userResourceNode.get("id").asText();
        String email = userResourceNode.get("email").asText();
        String name = userResourceNode.get("name").asText();
        String picture = userResourceNode.get("picture").asText();
        String isExistId= isExistId(id);
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setId(id);
        loginDTO.setEmail(email);
        loginDTO.setName(name);
        loginDTO.setProfile_image(picture);
        if(isExistId.equals("exist")){
            loginDTO.setDriver(driverYN);
            System.out.println("이미 존재한 회원");
        }else{
            loginDTO.setDriver(false);
            insertUser(loginDTO);
            System.out.println("회원가입 완료");
        }
        session.setAttribute("loginDTO",loginDTO);
    }


    @Override
    public String isExistId(String id) {
        Optional<LoginDTO> loginDTO = loginDAO.findById(id);
        if(loginDTO.isPresent()){
            LoginDTO loginDTO1 = loginDTO.get();
            driverYN=loginDTO1.isDriver();
            return "exist";
        }else{
            return "non_exist";
        }

    }

    @Override
    public void insertUser(LoginDTO loginDTO) {
        loginDAO.save(loginDTO);
    }

    @Override
    public void driverUpdate(String id,boolean driverYN) {
        loginDAO.updateDriver(id,driverYN);
    }

    @Override
    public Optional<LoginDTO> findById(String userId) {

        return loginDAO.findById(userId);
    }

    private String getAccessToken(String authorizationCode) {
        String clientId = "601610993000-u4u34s3r1op37juvet6fmr0hee3e3u1d.apps.googleusercontent.com";
        String clientSecret = "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";
        String redirectUri = "https://dongwoossltest.shop/api/login/google" ;

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