package chat.controller;

import chat.entity.MessageRoom;
import chat.service.MessageRoomService;
import login.dto.LoginDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
@Setter
//@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/messagesroom")
public class ChatListController {


    private final MessageRoomService messageRoomService;
    @Autowired
    public ChatListController(MessageRoomService messageRoomService) {
        this.messageRoomService = messageRoomService;
    }

    @GetMapping("/roomuserInfo")
    public Map<String, String> getUserInfo(@SessionAttribute(name = "loginDTO", required = false) LoginDTO loginDTO) {
        Map<String, String> userInfo = new HashMap<>();
        if (loginDTO != null) {
            userInfo.put("name", loginDTO.getName());
            userInfo.put("profile_image", loginDTO.getProfile_image());
        } else {
            // 로그인되지 않은 경우에 대한 처리
            userInfo.put("name", null);
            userInfo.put("profile_image", null);
        }
        return userInfo;
    }

    @GetMapping("/userChatRooms")
    public List<MessageRoom> getUserChatRooms(@SessionAttribute(name = "loginDTO", required = false) LoginDTO loginDTO) {
        if (loginDTO != null) {
            // 세션에서 사용자 이름 가져오기
            String userName = loginDTO.getName();

            // 사용자 이름을 기반으로 채팅 목록 가져오기
            List<MessageRoom> userChatRooms = messageRoomService.getChatRoomsByUserName(userName);
            return userChatRooms;
        } else {
            // 로그인되지 않은 경우, 빈 목록 반환 혹은 예외 처리
            return null;
        }
    }

    @GetMapping("/user/{userName}/rooms")
    public ResponseEntity<List<MessageRoom>> getRoomsByUserName(@PathVariable String userName) {
        List<MessageRoom> userRooms = messageRoomService.getRoomsByUserName(userName);
        return ResponseEntity.ok(userRooms);
    }
}

