package booking.entity;

import booking.contoller.BookingStatus;
import booking.dto.BookingDTO;
import car.entity.Car;
import jakarta.persistence.*;
import login.dto.LoginDTO;
import lombok.*;
import review.entity.ReviewEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Setter
@Getter
@Builder
@Table(name = "booking")
@AllArgsConstructor
@NoArgsConstructor
public class BookingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long booking_id;

    @Column(name = "start_date")
    private LocalDate start_date;

    @Column(name = "end_date")
    private LocalDate end_date;

    @Column(name = "start_time")
    private LocalTime start_time;

    @Column(name = "end_time")
    private LocalTime end_time;

    @Column(name = "host_name")
    private String host_name;

    @Column(name = "guest_name")
    private String guest_name;

    @Enumerated(EnumType.STRING)
    @Column(name = "booking_status")
    private BookingStatus booking_status;

    @Column(name = "create_date")
    private LocalDateTime create_date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", referencedColumnName = "id", nullable = false)
    private LoginDTO loginDTO;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @JoinColumn(name = "review_id")
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "bookingEntity")
    private ReviewEntity reviewEntity;

    // setter와 기타 메서드들



    //===== 서비스 구현 =====//

public void setBookingStatus(BookingEntity booking) {
        LocalDate now = LocalDate.now();
        System.out.println("now = " + now);

        if (booking.getStart_date() == null || booking.getEnd_date() == null) {
            throw new IllegalArgumentException("정보가 없습니다.");
        }

        if (now.isAfter(booking.getEnd_date())) {
            booking.setBooking_status(BookingStatus.AFTER);
        } else if (now.isBefore(booking.getStart_date())) {
            booking.setBooking_status(BookingStatus.BEFORE);
        } else {
            booking.setBooking_status(BookingStatus.NOW);
        }
    }


//    public LocalDate targetday(Integer days) {
//        LocalDate currentDate = LocalDate.now();
//        return (days != null) ? currentDate.minusDays(days) : currentDate;
//    }

    /* ===== 부킹 타이틀 이미지 갖고오기 ====*/
    public void setImage (String booking){
        BookingDTO bookingDTO =new BookingDTO();
        String baseUrl = "https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/booking/";
        String imageName = getLoginDTO().getImage_file_name();
        String imageUrl = baseUrl + imageName;
        bookingDTO.setImageUrl(imageUrl);
    }

    /**
     * MEMBER booking average score
     * */


}
