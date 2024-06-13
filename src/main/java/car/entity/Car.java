package car.entity;

import booking.entity.BookingEntity;
import jakarta.persistence.*;
import login.dto.LoginDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import wishList.entity.WishListEntity;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "CAR")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_id")
    private Long carId;

    // fetch = FetchType.LAZY는 지연 로딩 전략을 사용하여 관련 엔티티를 필요할 때만 불러오도록 설정합니다.
//    @ManyToOne(fetch = FetchType.LAZY)  // user 테이블과 다대일(Many-to-One)
//    @JoinColumn(name = "id", nullable = false)
//    private User user;

    @Column(name = "user_id")
    private String userId;

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

    @Column(name = "rating")  // 자동차 평점
    private float rating;

    @Column(name = "wish")
    private int wish;


    //cascade = CascadeType.ALL : 영속성 변경(생성, 수정, 삭제 등)이 연관된 WishList 엔티티들에게도 적용, ex)  Car 엔티티를 삭제하면,
    //이와 관련된 모든 WishList 엔티티들도 함께 삭제
    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL)
    private List<WishListEntity> wishLists;
//
    //@PrePersist - 데이터베이스에 INSERT 쿼리가 실행되기 전에 호출되는 메서드를 정의할 때 사용
    @PrePersist
    protected void onCreate() {
        createdDate = LocalDateTime.now();
        //updateWishCount();
    }
//
//    /*엔티티의 상태가 변경될 때마다 wishLists 필드의 상태를 기반으로 wish 필드를 동기화하여, 데이터 일관성을 유지*/
    @PostLoad       // Car 엔티티가 데이터베이스에서 load 된 후에 호출
    @PostPersist    // 처음으로 데이터베이스에 저장된 후 호출
    @PostUpdate     // WishList 데이터베이스에 업데이트된 후 호출
    private void updateWishCount() {
        this.wish = wishLists == null ? 0 : wishLists.size();
    }
}
