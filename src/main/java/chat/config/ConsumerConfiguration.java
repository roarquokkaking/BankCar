package chat.config;

import com.google.common.collect.ImmutableMap;
import chat.bean.MessageRoom;
import chat.bean.SendMessageForm;
import chat.service.KafkaService;
import chat.bean.SendMessageForm;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.ContainerProperties;
import org.springframework.kafka.listener.MessageListener;
import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.List;
import java.util.Map;

@Slf4j
@EnableKafka
@Configuration
public class ConsumerConfiguration {
//    @Autowired
//    private KafkaListenerEndpointRegistry kafkaListenerEndpointRegistry;
//
    @Autowired
    private KafkaService kafkaService;

//    @Bean
//    public ConcurrentKafkaListenerContainerFactory<String, SendMessageForm> kafkaListenerContainerFactory() {
//        ConcurrentKafkaListenerContainerFactory<String, SendMessageForm> kafkaListenerContainerFactory = new ConcurrentKafkaListenerContainerFactory<>();
//        kafkaListenerContainerFactory.setConsumerFactory(consumerFactory());
//        return kafkaListenerContainerFactory;
//    }
//
    private JsonDeserializer<SendMessageForm> getAllTrustJsonDeserializer() {
        JsonDeserializer<SendMessageForm> allTrustJsonDeserializer = new JsonDeserializer<>();
        allTrustJsonDeserializer.addTrustedPackages("*");
        return allTrustJsonDeserializer;
    }

    private Map<String, Object> consumerConfigurations() {
        Map<String, Object> consumerConfigurations =
                ImmutableMap.<String, Object>builder()
                        .put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, KafkaConstants.KAFKA_BROKER)
                        .put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class)
                        .put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class)
                        .put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS, getAllTrustJsonDeserializer())
                        .put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest")
                        .put(ConsumerConfig.GROUP_ID_CONFIG, "messageListener")
                        .build();
        return consumerConfigurations;
    }

    private ConsumerFactory<String, SendMessageForm> consumerFactory() {
        return new DefaultKafkaConsumerFactory<>(consumerConfigurations(), new StringDeserializer(), getAllTrustJsonDeserializer());
    }

    public void messageConsumerFactory(List<String> topics) {
        for (String topic : topics) {
            messageConsumerFactory(topic);
        }
    }
//
    public void messageConsumerFactory(String topic) {
        ContainerProperties containerProps = new ContainerProperties(topic);
        containerProps.setMessageListener((MessageListener<String, SendMessageForm>) record -> {
            kafkaService.broadcastMessage(topic, record.value());
        });

        ConcurrentMessageListenerContainer<String, SendMessageForm> container =
                new ConcurrentMessageListenerContainer<>(consumerFactory(), containerProps);
        container.setBeanName("container-" + topic);
        container.start();
    }
//
//    @Bean
//    public ConcurrentKafkaListenerContainerFactory<String, MessageRoom> messageRoomKafkaListenerContainerFactory() {
//        ConcurrentKafkaListenerContainerFactory<String, MessageRoom> factory =
//                new ConcurrentKafkaListenerContainerFactory<>();
//        factory.setConsumerFactory(messageRoomConsumerFactory());
//        return factory;
//    }
//
//    private ConsumerFactory<String, MessageRoom> messageRoomConsumerFactory() {
//        JsonDeserializer<MessageRoom> jsonDeserializer = new JsonDeserializer<>(MessageRoom.class);
//        jsonDeserializer.addTrustedPackages("*");
//
//        return new DefaultKafkaConsumerFactory<>(
//                consumerConfigurations(),
//                new StringDeserializer(),
//                jsonDeserializer
//        );
//    }
}