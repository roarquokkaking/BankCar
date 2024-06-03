package chat.controller;

import chat.dto.ChatDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@RestController
public class WebSocketController {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketController.class);

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ConcurrentMap<String, Integer> sessions = new ConcurrentHashMap<>();

    public WebSocketController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @EventListener(SessionConnectEvent.class)
    public void onConnect(SessionConnectEvent event){
        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
        String userId = event.getMessage().getHeaders().get("nativeHeaders").toString().split("User=\\[")[1].split("]")[0];

        sessions.put(sessionId, Integer.valueOf(userId));
    }
    @EventListener(SessionDisconnectEvent.class)
    public void onDisconnect(SessionDisconnectEvent event) {
        sessions.remove(event.getSessionId());
    }

    @MessageMapping("/chat")
    public void sendMessage(ChatDTO chatDTO, SimpMessageHeaderAccessor accessor) {
        Integer writerId = sessions.get(accessor.getSessionId());
        chatDTO.setWriterId(writerId);

        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDTO.getApplyId(), chatDTO);
    }
}