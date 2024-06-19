package chat.service;

import chat.entity.Message;

import java.util.List;

public interface MessageService {

    Message saveMessage(Message message);

    List<Message> getAllMessages();

    List<Message> findByMessageRoom_RoomSeq(Long roomSeq);

}
