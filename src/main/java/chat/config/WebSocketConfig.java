package chat.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/ChattingRoom") // WebSocket 엔드포인트 설정
                .setAllowedOrigins("https://dongwoossltest.shop").withSockJS()
                .setHeartbeatTime(1000);
    }

//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
//    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic", "/queue")
        .setHeartbeatValue(new long[]{10000, 10000}) // Heartbeat 설정 (10초마다)
        .setTaskScheduler(heartBeatScheduler());  // TaskScheduler 설정
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setSendTimeLimit(15 * 1000) // 클라이언트가 PONG 메시지를 보내야 할 시간 (밀리초)
                .setSendBufferSizeLimit(512 * 1024) // 버퍼 크기 제한 (바이트)
                .setMessageSizeLimit(128 * 1024); // 최대 메시지 크기 (바이트)
    }

    @Bean
    public ThreadPoolTaskScheduler heartBeatScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(1);
        scheduler.setThreadNamePrefix("wss-heartbeat-thread-");
        scheduler.initialize();
        return scheduler;
    }

}
