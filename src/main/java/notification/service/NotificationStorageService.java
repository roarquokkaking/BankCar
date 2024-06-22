package notification.service;


import notification.entity.Notification;
import notification.repository.NotificationStorageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class NotificationStorageService {

    private final NotificationStorageRepository notifRepository;

    public NotificationStorageService(NotificationStorageRepository notifRepository) {
        this.notifRepository = notifRepository;
    }

    public Notification createNotificationStorage(Notification notificationStorage) {
        return notifRepository.save(notificationStorage);
    }


    public Notification getNotificationsByID(Long id) {
        return notifRepository.findById(id).orElseThrow(() -> new RuntimeException("notification not found!"));
    }

    public List<Notification> getNotificationsByUserIDNotRead(String userID) {
        return notifRepository.findByUserToIdAndDeliveredFalse(userID);
    }


    public List<Notification> getNotificationsByUserID(String userID) {
        return notifRepository.findByUserToId(userID);
    }

    public Notification changeNotifStatusToRead(Long notifID) {
        var notif = notifRepository.findById(notifID)
                .orElseThrow(() -> new RuntimeException("not found!"));
        notif.setReadStatus(true);
        return notifRepository.save(notif);
    }

    public void clear() {
        notifRepository.deleteAll();
    }
}
