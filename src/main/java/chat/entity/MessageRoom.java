package chat.entity;

import javax.persistence.*;

@Entity
@Table(name="messageroom")
public class MessageRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomSeq; // Long 타입으로 변경 및 AUTO_INCREMENT 설정

    @Column(nullable = false)
    private String host;

    @Column( nullable = false)
    private String guest;

//
//    @Column(name="room_name", nullable = false)
//    private String roomName;



    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getGuest() {
        return guest;
    }

    public void setGuest(String guest) {
        this.guest = guest;
    }


    public Long getRoomSeq() {
        return roomSeq;
    }

    public void setRoomSeq(Long roomSeq) {
        this.roomSeq = roomSeq;
    }

}
