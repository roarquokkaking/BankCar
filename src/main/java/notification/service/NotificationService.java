package notification.service;

import notification.controller.SseController;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class NotificationService {
    private final SseController sseController;

    public NotificationService(SseController sseController) {
        this.sseController = sseController;
    }

    public void notifyUser(String userId) {
        try {
            sseController.notifyUser(userId);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
