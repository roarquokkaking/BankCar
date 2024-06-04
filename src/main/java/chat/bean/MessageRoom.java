package chat.bean;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MessageRoom {
    @Id
    private String roomId;

    private String name;

    @OneToMany(mappedBy = "messageRoom", cascade = CascadeType.ALL)
    private List<JoinUser> joinUsers;

    @Builder(toBuilder = true)
    public MessageRoom(String name) {
        this.name = name;
    }

    // Getter methods
    public String getRoomId() {
        return roomId;
    }

    public String getName() {
        return name;
    }

    public List<JoinUser> getJoinUsers() {
        return joinUsers;
    }

    public void setName(String name) {
    }
}
