package chat.entity;

import jakarta.persistence.*;
import login.dto.LoginDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
@Getter
@Setter
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


}
