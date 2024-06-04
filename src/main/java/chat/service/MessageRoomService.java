package chat.service;

import lombok.extern.slf4j.Slf4j;
import chat.bean.JoinUser;
import chat.bean.MessageRoom;
import chat.config.ConsumerConfiguration;
import chat.repository.JoinUserRepository;
import chat.repository.MessageRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import login.dto.LoginDTO;
import login.dao.LoginDAO;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class MessageRoomService {
    @Autowired
    private final MessageRoomRepository messageRoomRepository;
    @Autowired
    private final LoginDAO loginDAO;
    @Autowired
    private final JoinUserRepository joinUserRepository;
    @Autowired
    private final ConsumerConfiguration consumerConfiguration;


    public MessageRoomService(MessageRoomRepository messageRoomRepository,
                              LoginDAO loginDAO,
                              JoinUserRepository joinUserRepository,
                              ConsumerConfiguration consumerConfiguration) {
        this.messageRoomRepository = messageRoomRepository;
        this.loginDAO = loginDAO;
        this.joinUserRepository = joinUserRepository;
        this.consumerConfiguration = consumerConfiguration;
    }

    public void createRoom(MessageRoom messageRoom, List<String> id) {
        messageRoomRepository.save(messageRoom);
        List<LoginDTO> users = loginDAO.findAllById(id);
        joinRoom(messageRoom, users);
        consumerConfiguration.messageConsumerFactory("messageRoom" + messageRoom.getName());
    }

    public void joinRoom(MessageRoom messageRoom, List<LoginDTO> users) {
        for(LoginDTO loginDTO : users) {
            joinRoom(messageRoom, users);
        }
    }

    public void joinRoom(MessageRoom messageRoom, LoginDTO loginDTO) {
        JoinUser joinUser = new JoinUser(loginDTO, messageRoom);
        joinUserRepository.save(joinUser);
    }

    public void joinRoom(String messageRoomId, List<String> userIds) {
        for(String id : userIds) {
            joinRoom(messageRoomId, id);
        }
    }

    public void joinRoom(String messageRoomId, String id) {
        MessageRoom messageRoom = messageRoomRepository.findById(messageRoomId)
                .orElseThrow(() -> new IllegalArgumentException("MessageRoom not found with id: " + messageRoomId));
        LoginDTO loginDTO = loginDAO.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("LoginDTO not found with id: " + id));

        JoinUser joinUser = new JoinUser(loginDTO, messageRoom);
        joinUserRepository.save(joinUser);
    }

    public void exitRoom(String roomId, String loginId) {
        joinUserRepository.findByMessageRoom_RoomIdAndLoginDTO_Id(roomId, loginId).ifPresent(joinUserRepository::delete);
    }


    public List<MessageRoom> getMessageRooms(String id) {
        return joinUserRepository.findByid(id).stream()
                .map(JoinUser::getMessageRoom)
                .collect(Collectors.toList());
    }
}
