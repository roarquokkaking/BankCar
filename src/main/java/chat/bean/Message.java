package chat.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private String messageRoomId;

    private int messageType;

    private String content;

    private String sendDate;

    public String getId() {
        return id;
    }

    public String getMessageRoomId() {
        return messageRoomId;
    }


    public int getMessageType() {
        return messageType;
    }

    public String getContent() {
        return content;
    }

    public String getSendDate() {
        return sendDate;
    }

    private Message(String messageRoomId,int messageType, String content, String sendDate) {
        this.id = UUID.randomUUID().toString();
        this.messageRoomId = messageRoomId;
        this.messageType = messageType;
        this.content = content;
        this.sendDate = sendDate;
    }
}