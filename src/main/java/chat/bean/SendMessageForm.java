package chat.bean;

import java.time.LocalDateTime;

public class SendMessageForm {
    private String userId;
    private int messageType;
    private String content;
    private String sendDate;

    public SendMessageForm() {
        // 기본 생성자
    }

    public SendMessageForm(String userId, int messageType, String content, String sendDate) {
        this.userId = userId;
        this.messageType = messageType;
        this.content = content;
        this.sendDate = sendDate;
    }

    public String getMessageRoomId() {
        return userId;
    }

    public void setMessageRoomId(String messageRoomId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getMessageType() {
        return messageType;
    }

    public void setMessageType(int messageType) {
        this.messageType = messageType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSendDate() {
        return sendDate;
    }

    public void setSendDate(String sendDate) {
        this.sendDate = sendDate;
    }

    public SendMessageForm setSendDateToCurrentTime() {
        this.sendDate = LocalDateTime.now().toString();
        return this;
    }
}
