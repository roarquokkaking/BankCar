package chat.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import login.dto.LoginDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Getter
@Setter
@Entity
@Table(name="messageroom")
public class MessageRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_seq")
    private Long roomSeq; // Long 타입으로 변경 및 AUTO_INCREMENT 설정

    @Column(nullable = false)
    private String hostName;

    @Column( nullable = false)
    private String guestName;

    // 추가된 필드
    @Column(name = "host_profile_image")
    private String hostProfileImage;

    @Column(name = "guest_profile_image")
    private String guestProfileImage;


    @OneToMany(mappedBy = "messageRoom", cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<Message> messages;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "last_message_id")
    private Message lastMessage;

    // 기본 생성자
    public MessageRoom() {
    }

    // 모든 필드를 초기화하는 생성자
    public MessageRoom(Long roomSeq, String hostName, String guestName) {
        this.roomSeq = roomSeq;
        this.hostName = hostName;
        this.guestName = guestName;
    }



}
