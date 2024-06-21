package chat.controller;

import chat.entity.Message;
import chat.entity.MessageRoom;
import chat.repository.MessageRoomRepository;
import chat.service.MessageService;
import jakarta.servlet.http.HttpSession;
import login.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;


//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "https://dongwoossltest.shop")
@RestController
@RequestMapping("/api/messages")
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MessageService messageService;
    private final MessageRoomRepository messageRoomRepository;


    @Autowired
    public ChatController(SimpMessagingTemplate messagingTemplate, MessageService messageService, MessageRoomRepository messageRoomRepository) {
        this.messagingTemplate = messagingTemplate;
        this.messageService = messageService;
        this.messageRoomRepository = messageRoomRepository;

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

//    @PostMapping("/send")
//    public ResponseEntity<Message> sendMessage(@RequestBody Message message,
//                                               @SessionAttribute(name = "loginDTO", required = false) LoginDTO loginDTO) {
//        try {
//            if (loginDTO != null) {
//                String senderName = loginDTO.getName();
//                message.setSender(senderName);
//                message.setSentTime(LocalDateTime.now());
//
//                // 메시지 RoomSeq 값 검증
//                if (message.getMessageRoom() == null || message.getMessageRoom().getRoomSeq() == null) {
//                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // BAD_REQUEST(400) 응답 반환
//                }
//
//                // 메시지 저장
//                Message savedMessage = messageService.saveMessage(message);
//
//                Long roomSeq = savedMessage.getMessageRoom().getRoomSeq();
//                // 메시지 전송
//                messagingTemplate.convertAndSend("/topic/public" + roomSeq, savedMessage);
//
//                return ResponseEntity.ok(savedMessage);
//            } else {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // UNAUTHORIZED(401) 응답 반환
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // INTERNAL_SERVER_ERROR(500) 응답 반환
//        }
//    }

    @MessageMapping("/sendMessage")
    public void sendMessage(Message message, HttpSession session) {
        try {

            LoginDTO loginDTO = (LoginDTO) session.getAttribute("loginDTO");


            if (loginDTO != null) {
                String senderName = loginDTO.getName();
                message.setSender(senderName);
                message.setSentTime(LocalDateTime.now());

                // 메시지 RoomSeq 값 검증
                if (message.getMessageRoom() == null || message.getMessageRoom().getRoomSeq() == null) {
                    // BAD_REQUEST(400) 응답 반환
                    messagingTemplate.convertAndSendToUser(senderName, "/queue/errors", "Invalid room sequence.");
                    return;
                }

                // 메시지 저장
                Message savedMessage = messageService.saveMessage(message);
                System.out.println("메세지 저장" + savedMessage);
                // 로그 출력

                Long roomSeq = savedMessage.getMessageRoom().getRoomSeq();
                // 메시지 전송
                messagingTemplate.convertAndSend("/topic/public/" + roomSeq, savedMessage);
            } else {
                // UNAUTHORIZED(401) 응답 반환
                messagingTemplate.convertAndSendToUser("anonymous", "/queue/errors", "Unauthorized.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            // INTERNAL_SERVER_ERROR(500) 응답 반환
            messagingTemplate.convertAndSendToUser("anonymous", "/queue/errors", "Internal server error.");
        }
    }
    @GetMapping("/roomseq/{roomSeq}")
    public ResponseEntity<List<Message>> getMessagesByRoomSeq(@PathVariable Long roomSeq) {
        try {
            List<Message> messages = messageService.findByMessageRoom_RoomSeq(roomSeq);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
