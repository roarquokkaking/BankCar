package notification.entity;

import jakarta.persistence.*;
import login.dto.LoginDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "NOTIFICATION")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long notificationId;

    @Column(name = "content")
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_to_id")
    private LoginDTO userTo;

    @ManyToOne
    @JoinColumn(name = "user_from_id")
    private LoginDTO userFrom;

    @Column(name = "delivered")
    private boolean delivered;

    @Column(name = "read_status")
    private boolean readStatus;

}
