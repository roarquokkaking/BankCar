package chat.service;

import chat.entity.Message;
import chat.repository.MessageRepository;
import chat.repository.MessageRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final MessageRoomRepository messageRoomRepository;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository, MessageRoomRepository messageRoomRepository) {

        this.messageRepository = messageRepository;
        this.messageRoomRepository = messageRoomRepository;
    }

    // 메시지 저장
    public Message saveMessage(Message message) {

        // Message 저장
        return messageRepository.save(message);
    }

    // 모든 메시지 조회
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @Override
    public List<Message> findByMessageRoom_RoomSeq(Long roomseq) {
        return messageRepository.findByMessageRoom_RoomSeq(roomseq);
    }

}
