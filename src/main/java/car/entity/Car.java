package car.entity;

import jakarta.persistence.*;
import login.dto.LoginDTO;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "CAR")
@Data
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_id")
    private int carId;

    // fetch = FetchType.LAZY는 지연 로딩 전략을 사용하여 관련 엔티티를 필요할 때만 불러오도록 설정합니다.
//    @ManyToOne(fetch = FetchType.LAZY)  // user 테이블과 다대일(Many-to-One)
//    @JoinColumn(name = "id", nullable = false)
//    private LoginDTO user;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "doro_address")
    private String doroAddress;

    @Column(name = "jibun_address")
    private String jibunAddress;

    @Column(name = "category")
    private String category;

    @Column(name = "model")
    private String model;

    @Column(name = "since")
    private LocalDateTime since;

    @Column(name = "color")
    private String color;

    @Column(name = "price")
    private Integer price;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "rating")
    private Float rating;
}
