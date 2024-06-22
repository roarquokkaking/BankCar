package notification.repository;

import notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationStorageRepository extends JpaRepository<Notification, Long> {

    Optional<Notification> findById(Long id);

    List<Notification> findByUserToId(String id);

    List<Notification> findByUserToIdAndDeliveredFalse(String id);


}
