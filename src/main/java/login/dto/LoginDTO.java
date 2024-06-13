package login.dto;

import booking.entity.BookingEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="user")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class LoginDTO {
    @Id
    @Column(name="id")
    private String id;
    @Column(name="email")
    private String email;
    @Column(name="name")
    private String name;
    @Column(name="driver")
    private boolean driver;
    private String imageUrl;

    @Column(name="profile_image")
    private String profile_image;

    @Column(name = "phone_number" ,nullable = true)
    private String phone_number;// 전화번호
    @Column(name = " create_date",nullable = true)
    private LocalDateTime create_date ;// 가입 날짜
    @Column(name = "rating",nullable = true)
    private Float rating ; //매너 온도
    @Column(name ="image_file_name",nullable = true)
    private String image_file_name; // 클라우드 이미지 uuid
    @Column(name ="image_original_name",nullable = true)
    private String image_original_name ; //이미지 실제 이름

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private List<BookingEntity> bookingEntity;

}
