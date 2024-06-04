package chat.config;


import com.google.common.collect.ImmutableMap;
import chat.bean.SendMessageForm;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.Map;

@Configuration
public class ProducerConfiguration {

    private Map<String, Object> producerConfigurations() {
        Map<String, Object> producerConfigurations =
                ImmutableMap.<String, Object>builder()
                        .put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, KafkaConstants.KAFKA_BROKER)
                        .put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class)
                        .put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class)
                        .put(ProducerConfig.RETRIES_CONFIG, 3)
                        .build();
        return producerConfigurations;
    }

    private ProducerFactory<String, SendMessageForm> producerFactory() {
        return new DefaultKafkaProducerFactory<>(producerConfigurations());
    }

    @Bean
    public KafkaTemplate<String, SendMessageForm> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}