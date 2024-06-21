package chat.service;

import chat.entity.Message;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface MessageService {

    Message saveMessage(Message message);

    List<Message> getAllMessages();

    List<Message> findByMessageRoom_RoomSeq(Long roomSeq);

}
