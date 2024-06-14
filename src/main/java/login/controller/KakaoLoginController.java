package login.controller;


import jakarta.servlet.http.HttpSession;
import login.dto.LoginDTO;
import login.service.KakaoLoginService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@CrossOrigin(origins="http://localhost:3000")    // 다른 포트에서 넘오는 것을 받을 수 있다.
@RestController
@RequestMapping(produces = "application/json")
public class KakaoLoginController {

    @Autowired
    KakaoLoginService loginService;

    @GetMapping(path = "login/kakao")
    public RedirectView kakao(@RequestParam String code, HttpSession session){
        loginService.kakaoLogin(code, session );
        LoginDTO loginDTO = (LoginDTO) session.getAttribute("loginDTO");
        String id = URLEncoder.encode(loginDTO.getId(), StandardCharsets.UTF_8);
        String email = URLEncoder.encode(loginDTO.getEmail(), StandardCharsets.UTF_8);
        String name = URLEncoder.encode(loginDTO.getName(), StandardCharsets.UTF_8);
        String url="http://localhost:3000/login/kakao?id="+id+"&email="+email+"&name="+name;
        return new RedirectView(url);
    }




}
