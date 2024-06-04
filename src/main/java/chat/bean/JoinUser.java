package chat.bean;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import login.dto.LoginDTO;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class JoinUser{

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "login_id", referencedColumnName = "id")
    private LoginDTO loginDTO;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_Id", referencedColumnName = "roomId")
    private MessageRoom messageRoom;



    public JoinUser(LoginDTO loginDTO, MessageRoom messageRoom) {
        this.id = loginDTO.getId();
        this.loginDTO = loginDTO;
        this.messageRoom = messageRoom;
    }

    // Getter methods


    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public LoginDTO getLoginDTO() {
        return loginDTO;
    }

    public void setLoginDTO(LoginDTO loginDTO) {
        this.loginDTO = loginDTO;
    }

    public MessageRoom getMessageRoom() {
        return messageRoom;
    }

    public void setMessageRoom(MessageRoom messageRoom) {
        this.messageRoom = messageRoom;
    }
}
