package notification.controller;

import login.dto.LoginDTO;
import login.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import notification.entity.Notification;
import notification.service.NotificationStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@CrossOrigin(origins= {"http://localhost:3000", "https://dongwoossltest.shop"})
@RestController
@RequestMapping("/test")
@Slf4j
public class testController {
    private final NotificationStorageService notificationStorageService;
    private final LoginService loginService;

    public testController(NotificationStorageService notificationStorageService, LoginService loginService) {
        this.notificationStorageService = notificationStorageService;
        this.loginService = loginService;
    }

    @GetMapping
    public ResponseEntity<String> test(){
        // 예약 완료시 알림 보내기
        Optional<LoginDTO> user = loginService.findById("SBLZZpJNJEOCMpUy-x-cOGhN4T_r0eeOj2iR691BYh4");
        notificationStorageService.createNotificationStorage(Notification.builder()
                .delivered(false)
                .content( "차량을 예약하셨습니다.")
                .userFrom(user.get())
                .userTo(user.get()).build());
        return ResponseEntity.ok("테스트 성공");
    }
}
