package chat.entity;

import jakarta.persistence.*;
import login.dto.LoginDTO;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="messageroom")
public class MessageRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Long 타입으로 변경 및 AUTO_INCREMENT 설정

    @Column(name="room_name", nullable = false)
    private String roomName;

    @ElementCollection
    @CollectionTable(name="chat_room_users", joinColumns = @JoinColumn(name="chat_room_id"))
    @Column(name="user_id")
    private Set<String> userIds = new HashSet<>();

    public MessageRoom() {
    }

    public MessageRoom(String roomName, Set<String> userIds) {
        this.roomName = roomName;
        this.userIds = userIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public Set<String> getUserIds() {
        return userIds;
    }

    public void setUserIds(Set<String> userIds) {
        this.userIds = userIds;
    }
}
