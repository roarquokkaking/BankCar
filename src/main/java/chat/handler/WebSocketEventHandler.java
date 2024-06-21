package chat.handler;

import login.dto.LoginDTO;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketEventHandler {

    private final Map<String, String> userSessions = new ConcurrentHashMap<>();

    @EventListener
    public void handleSessionConnectedEvent(SessionConnectedEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        // getSessionAttributes() 반환 값이 null인 경우 처리
        Map<String, Object> sessionAttributes = accessor.getSessionAttributes();
        if (sessionAttributes == null) {
            // 예외 처리 또는 로그 출력 등
            System.err.println("Session attributes are null");
            return;
        }

        // loginDTO에서 로그인된 사용자 정보 가져오기
        LoginDTO loginDTO = (LoginDTO) sessionAttributes.get("loginDTO");
        if (loginDTO != null) {
            String username = loginDTO.getName();

            // 연결된 세션에 사용자 이름 매핑 저장
            String sessionId = accessor.getSessionId();
            userSessions.put(sessionId, username);

            System.out.println("User connected: " + username);
        } else {
            System.err.println("No loginDTO found in session attributes");
        }
    }

    @EventListener
    public void handleSessionDisconnectedEvent(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();

        // 연결 종료 시 매핑 정보 제거
        String username = userSessions.remove(sessionId);
        if (username != null) {
            System.out.println("User disconnected: " + username);
        } else {
            System.out.println("Unknown user disconnected");
        }
    }
}