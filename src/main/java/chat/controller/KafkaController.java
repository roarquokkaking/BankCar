package chat.controller;

import lombok.RequiredArgsConstructor;
import chat.bean.MessageRoom;
import chat.bean.SendMessageForm;
import chat.config.ConsumerConfiguration;
import chat.service.KafkaService;
import chat.service.MessageRoomService;
import chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class KafkaController {
    @Autowired
    private KafkaService kafkaService;

    @Autowired
    private ConsumerConfiguration consumerConfiguration;

    @MessageMapping("/{topic}")
    public void sendMessage(@DestinationVariable String topic, SendMessageForm message) throws Exception {
        kafkaService.send(topic, message);
    }

    @KafkaListener(id = "newRoomEventListener", topics = "newRoom", containerFactory = "kafkaListenerContainerFactory")
    public void listen(@Payload MessageRoom messageRoom) throws Exception{
        //consumerConfiguration.messageConsumerFactory("messageRoom" + messageRoom.getId());
    }
}