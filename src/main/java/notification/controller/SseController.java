package notification.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@RestController
@RequestMapping(path = "api")
@CrossOrigin(origins= {"http://localhost:3000", "https://dongwoossltest.shop"})
public class SseController {
    private final ConcurrentMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    @GetMapping( value = "/subscribe/{userId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable(value = "userId") String userId) {
        SseEmitter emitter = new SseEmitter();
        emitters.put(userId, emitter);
        try {
            emitter.send(SseEmitter.event()
                    .name("notification")
                    .data("connected!"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> emitters.remove(userId));
        return emitter;
    }

    @GetMapping("/notify/{userId}")
    public String notifyUser(@PathVariable(value = "userId") String userId) throws IOException {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            emitter.send(SseEmitter.event().name("notification").data("You have a new notification"));
        }
        return "Notification sent";
    }
}
