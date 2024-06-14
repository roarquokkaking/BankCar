package chat.service;

import chat.entity.Message;
import chat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    // 메시지 저장
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    // 모든 메시지 조회
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
}
