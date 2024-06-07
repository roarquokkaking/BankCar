package chat.entity;

import jakarta.persistence.*;
import login.dto.LoginDTO;

import java.time.LocalDateTime;

@Entity
@Table(name="message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="message_id")
    private Long id;

    @Column(name="content", nullable = false)
    private String content;

    @Column(name="sentTime", nullable = false)
    private LocalDateTime sentTime;

    // 송신자 ID. LoginDTO의 id와 연결
    @ManyToOne
    @JoinColumn(name="sender_id", referencedColumnName = "id")
    private LoginDTO sender;

    // 수신자 ID. LoginDTO의 id와 연결
    @ManyToOne
    @JoinColumn(name="receiver_id", referencedColumnName = "id")
    private LoginDTO receiver;

    @ManyToOne
    @JoinColumn(name="chat_room_id", referencedColumnName = "id")
    private MessageRoom chatRoom;

    public Long getMessageId() {
        return id;
    }

    public void setMessageId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getSentTime() {
        return sentTime;
    }

    public void setSentTime(LocalDateTime sentTime) {
        this.sentTime = sentTime;
    }

    public LoginDTO getSender() {
        return sender;
    }

    public void setSender(LoginDTO sender) {
        this.sender = sender;
    }

    public LoginDTO getReceiver() {
        return receiver;
    }

    public void setReceiver(LoginDTO receiver) {
        this.receiver = receiver;
    }

    public Message() {
    }

    public Message(String content, LocalDateTime sentTime, LoginDTO sender, LoginDTO receiver) {
        this.content = content;
        this.sentTime = sentTime;
        this.sender = sender;
        this.receiver = receiver;
    }

}
