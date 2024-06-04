package chat.service;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import chat.bean.SendMessageForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaService {
    @Autowired
    private KafkaTemplate<String, SendMessageForm> kafkaTemplate;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void send(String topic, SendMessageForm message) {
        message = message.setSendDateToCurrentTime();
        System.out.println(message);
        try {
            kafkaTemplate.send(topic, message).get(3, TimeUnit.SECONDS);
        } catch (ExecutionException e) {
            System.out.println(e);
        } catch (TimeoutException | InterruptedException e) {
            System.out.println(e);
        }
    }

    public void broadcastMessage(String topic, SendMessageForm message) {
        messagingTemplate.convertAndSend(topic, message);
    }
}