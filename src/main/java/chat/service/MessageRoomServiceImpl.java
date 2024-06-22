package chat.service;

import chat.entity.MessageRoom;
import chat.repository.MessageRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MessageRoomServiceImpl implements MessageRoomService {

    @Autowired
    private final MessageRoomRepository messageRoomRepository;

    @Autowired
    public MessageRoomServiceImpl(MessageRoomRepository messageRoomRepository) {
        this.messageRoomRepository = messageRoomRepository;
    }

    // userName으로 해당 사용자의 채팅 방 목록 조회
    public List<MessageRoom> getChatRoomsByUserName(String userName) {
        return messageRoomRepository.findByHostNameOrGuestName(userName, userName);
    }

    // 채팅 방 생성
    public MessageRoom createRoom(MessageRoom messageRoom) {
        return messageRoomRepository.save(messageRoom);
    }

    // 채팅 방 수정
    public MessageRoom updateRoom(Long roomseq, MessageRoom messageRoom) {
        // 기존 채팅 방 엔티티 조회
        MessageRoom existingRoom = messageRoomRepository.findById(roomseq)
                .orElseThrow(() -> new RuntimeException("채팅 방을 찾을 수 없습니다."));

        // 기존 채팅 방 엔티티의 정보를 주어진 messageRoom으로 업데이트
        existingRoom.setHostName(messageRoom.getHostName());
        existingRoom.setGuestName(messageRoom.getGuestName());

        // 업데이트된 채팅 방 엔티티 저장 및 반환
        return messageRoomRepository.save(existingRoom);
    }

    // 채팅 방 삭제
    public void deleteRoom(Long roomSeq) {
        messageRoomRepository.deleteById(roomSeq);
    }

    public List<MessageRoom> getRoomsByUserName(String userName) {
        // 사용자 이름이 호스트 또는 게스트인 채팅방 목록을 반환
        return messageRoomRepository.findByHostNameOrGuestName(userName, userName);
    }
}
