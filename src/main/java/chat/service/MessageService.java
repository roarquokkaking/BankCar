package chat.service;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import chat.bean.Message;
import chat.bean.MessageRoom;
import chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import login.dto.LoginDTO;

@Service
@Slf4j
public class MessageService {
    @Autowired
    private final MessageRepository messageRepository;


    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getMessage(String messageRoomId) {
        return messageRepository.findByMessageRoomId(messageRoomId);
    }

}