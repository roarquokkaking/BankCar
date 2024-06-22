package chat.service;

import chat.entity.MessageRoom;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Transactional
public interface MessageRoomService {

    List<MessageRoom> getChatRoomsByUserName(String userName);

    MessageRoom createRoom(MessageRoom messageRoom);

    MessageRoom updateRoom(Long roomseq, MessageRoom messageRoom);

    void deleteRoom(Long roomSeq);

    List<MessageRoom> getRoomsByUserName(String userName);

    List<MessageRoom> getAllChatRooms(Long roomSeq);

}
