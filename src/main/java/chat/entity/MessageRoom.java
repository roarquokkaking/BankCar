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


    @OneToMany(mappedBy = "messageRoom")
    @JsonManagedReference
    private List<Message> messages;

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
