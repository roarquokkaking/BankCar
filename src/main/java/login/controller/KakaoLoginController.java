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

@CrossOrigin(origins="https://dongwoossltest.shop")    // 다른 포트에서 넘오는 것을 받을 수 있다.
//@CrossOrigin(origins="http://localhost:3000")    // 다른 포트에서 넘오는 것을 받을 수 있다.
@RestController
@RequestMapping(path="/api/",produces = "application/json")
//@RequestMapping(produces = "application/json")
public class KakaoLoginController {

    @Autowired
    KakaoLoginService loginService;

    @GetMapping(path = "login/kakao")
    public RedirectView kakao(@RequestParam String code, HttpSession session) {
        // 카카오 로그인 서비스 호출 (세션에 loginDTO 객체 저장)
        loginService.kakaoLogin(code, session);

        // 세션에 loginDTO 객체가 저장되었는지 확인
        LoginDTO loginDTO = (LoginDTO) session.getAttribute("loginDTO");
        if (loginDTO != null) {
            // 세션 유효 시간을 1시간(3600초)으로 설정
            session.setMaxInactiveInterval(3600);

            // 로그인 정보를 URL 파라미터로 인코딩
            String id = URLEncoder.encode(loginDTO.getId(), StandardCharsets.UTF_8);
            String email = URLEncoder.encode(loginDTO.getEmail(), StandardCharsets.UTF_8);
            String name = URLEncoder.encode(loginDTO.getName(), StandardCharsets.UTF_8);
            String profile_image = URLEncoder.encode(loginDTO.getProfile_image(), StandardCharsets.UTF_8);
            // 리다이렉트 URL 설정
            String url = "https://dongwoossltest.shop/login/kakao?id=" + id + "&email=" + email + "&name=" + name + "&profile_image=" + profile_image;
            return new RedirectView(url);
        } else {
            // loginDTO가 null인 경우 에러 페이지로 리다이렉트
            return new RedirectView("/error");
        }
    }

}
