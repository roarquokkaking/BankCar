package notification.controller;

import notification.entity.Notification;
import notification.service.PushNotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@CrossOrigin(origins= {"http://localhost:3000", "https://dongwoossltest.shop"})
@RestController
@RequestMapping("/api/push-notifications")
@Slf4j
public class PushNotificationController {

    private final PushNotificationService service;

    public PushNotificationController(PushNotificationService service) {
        this.service = service;
    }

    // 회원이 로그인시 sse 구독 url -> 이후 이번트가 발생하면 List
    @GetMapping("/{userId}")
    public Flux<ServerSentEvent<List<Notification>>> streamLastMessage(@PathVariable(name = "userId") String userId) {
        log.info("Received SSE request for userId = {}", userId);
        return service.getNotificationsByUserToID(userId);
    }


}
