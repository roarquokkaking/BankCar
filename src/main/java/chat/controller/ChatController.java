package chat.controller;

import chat.entity.Message;
import chat.service.MessageService;
import jakarta.servlet.http.HttpSession;
import login.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;
    private final LoginDTO loginDTO;

    @Autowired
    public ChatController(SimpMessagingTemplate messagingTemplate, MessageService messageService, LoginDTO loginDTO) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
        this.loginDTO = loginDTO;
    }

    @GetMapping("/userInfo")
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

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody Message message,
                                               @SessionAttribute(name = "loginDTO", required = false) LoginDTO loginDTO) {
        try {
            if (loginDTO != null) {

                String senderName = loginDTO.getName();

                // 메시지의 sender를 로그인된 사용자 이름으로 설정
                message.setSender(senderName);
                // 메시지에 받는 사람의 이름 설정 (로그인된 사용자의 이름으로)
                message.setSentTime(LocalDateTime.now()); // 현재 시간을 메시지 보낸 시간으로 설정
                // 메시지 내용은 @RequestBody를 통해 이미 설정되어 있음
                // 메시지 저장
                Message savedMessage = messageService.saveMessage(message);
                // WebSocket을 통해 메시지 전송
                messagingTemplate.convertAndSend("/topic/public", savedMessage);
                return ResponseEntity.ok(savedMessage);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // loginDTO가 null인 경우 401 응답
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Message>> getMessages() {
        // 데이터베이스에서 메시지 목록을 조회
        List<Message> messages = messageService.getAllMessages();
        return ResponseEntity.ok(messages);
    }
}
