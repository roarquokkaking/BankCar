package notification.controller;

import notification.entity.Notification;
import notification.service.NotificationStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/notification")
@RestController
@CrossOrigin(origins= {"http://localhost:3000", "https://dongwoossltest.shop"})
public class NotificationStorageController {

    private final NotificationStorageService notifService;


    public NotificationStorageController(NotificationStorageService notifService) {
        this.notifService = notifService;
    }

    // 회원이 받은 알림 가져오는  url
    @GetMapping("/{userID}")
    public ResponseEntity<List<Notification>> getNotificationsByUserID(@PathVariable(value = "userID") String userID) {
        return ResponseEntity.ok(notifService.getNotificationsByUserID(userID));
    }

    // 읽은 알림을 update해주는 url
    @PatchMapping("/read/{notifID}")
    public ResponseEntity changeNotifStatusToRead(@PathVariable(value = "notifID") Long notifID) {
        return ResponseEntity.ok(notifService.changeNotifStatusToRead(notifID));
    }


}
