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
    private Long carId;

    // fetch = FetchType.LAZY는 지연 로딩 전략을 사용하여 관련 엔티티를 필요할 때만 불러오도록 설정합니다.
//    @ManyToOne(fetch = FetchType.LAZY)  // user 테이블과 다대일(Many-to-One)
//    @JoinColumn(name = "id", nullable = false)
//    private LoginDTO user;

    @Column(name = "title")
    private String title;

    @Lob    // TEXT 타입 지정
    @Column(name = "content")
    private String content;

    @Column(name = "latitude")      // 위도
    private String latitude;

    @Column(name = "longitude")     // 경도
    private String longitude;

    @Column(name = "doro_address")  // 도로명 주소
    private String doroAddress;

    @Column(name = "jibun_address") // 지번 주소
    private String jibunAddress;

    @Column(name = "category")
    private String category;

    @Column(name = "model")         // 자동차 모델
    private String model;

    @Column(name = "released")       // 출고 날짜
    private String released;

    @Column(name = "color")         // 자동차 색상
    private String color;

    @Column(name = "segment")       // 자동차 크기- ex) 중형,대형
    private String segment;

    @Column(name = "price")         // 시간당(1시간) 가격
    private int price;

    @Column(name = "created_date", nullable = false, updatable = false)     // 자동차 등록 날짜
    private LocalDateTime createdDate;

    @Column(name = "rating", nullable = false)  // 자동차 평점
    private float rating;

    //@PrePersist - 데이터베이스에 INSERT 쿼리가 실행되기 전에 호출되는 메서드를 정의할 때 사용
    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
    }
}
