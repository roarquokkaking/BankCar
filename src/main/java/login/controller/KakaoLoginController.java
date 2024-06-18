package login.controller;


import jakarta.servlet.http.HttpSession;
import login.dto.LoginDTO;
import login.service.KakaoLoginService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@CrossOrigin(origins="*")    // 다른 포트에서 넘오는 것을 받을 수 있다.
@RestController
@RequestMapping(path="/api/",produces = "application/json")
public class KakaoLoginController {

    @Autowired
    KakaoLoginService loginService;

    @GetMapping(path = "login/kakao")
    public RedirectView kakao(@RequestParam String code, HttpSession session){
        loginService.kakaoLogin(code, session );

        // 세션 유효 시간을 1시간(3600초)으로 설정
        session.setMaxInactiveInterval(3600);
        LoginDTO loginDTO = (LoginDTO) session.getAttribute("loginDTO");
        String id = URLEncoder.encode(loginDTO.getId(), StandardCharsets.UTF_8);
        String email = URLEncoder.encode(loginDTO.getEmail(), StandardCharsets.UTF_8);
        String name = URLEncoder.encode(loginDTO.getName(), StandardCharsets.UTF_8);
        String profile_image = URLEncoder.encode(loginDTO.getProfile_image(), StandardCharsets.UTF_8);
        String url="https://dongwoossltest.shop/login/kakao?id="+id+"&email="+email+"&name="+name+"&profile_image="+profile_image;
        return new RedirectView(url);
    }
}
