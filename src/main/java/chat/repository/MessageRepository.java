package chat.repository;

import chat.bean.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, String> {
    List<Message> findByMessageRoomId(String messageRoomId);
}
