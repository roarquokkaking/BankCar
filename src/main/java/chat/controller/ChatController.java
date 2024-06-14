package chat.controller;

import chat.entity.Message;
import chat.service.MessageService;
import jakarta.servlet.http.HttpSession;
import login.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;

    @Autowired
    public ChatController(SimpMessagingTemplate messagingTemplate, MessageService messageService) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody Message message, HttpSession session) {
        LoginDTO loginDTO = (LoginDTO) session.getAttribute("loginDTO");

//        if (loginDTO == null) {
//            return ResponseEntity.status(403).build(); // 로그인되지 않은 경우 처리
//        }

        message.setSender(loginDTO);
        message.setSentTime(LocalDateTime.now()); // 현재 시간을 메시지 보낸 시간으로 설정
        // 메시지 내용은 @RequestBody를 통해 이미 설정되어 있음

        // 메시지 저장
        Message savedMessage = messageService.saveMessage(message);

        // WebSocket을 통해 메시지 전송
        messagingTemplate.convertAndSend("/topic/public", savedMessage);

        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping
    public ResponseEntity<List<Message>> getMessages() {
        // 데이터베이스에서 메시지 목록을 조회
        List<Message> messages = messageService.getAllMessages();
        return ResponseEntity.ok(messages);
    }
}
