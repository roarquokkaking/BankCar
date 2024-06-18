package booking.entity;

import booking.contoller.BookingStatus;
import booking.contoller.ReviewStatus;
import booking.dto.BookingDTO;
import car.entity.Car;
import car.entity.CarImages;
import jakarta.persistence.*;
import login.dto.LoginDTO;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.joda.time.DateTime;


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

    @Column(name="end_date")
    private LocalDate end_date;

    @Column(name="start_time")
    private LocalTime start_time;

    @Column(name="end_time")
    private LocalTime end_time;

    @Column(name="host_name")
    private String host_name;

    @Column(name="guest_name")
    private String guest_name;


    @Enumerated(EnumType.STRING)
    @Column(name="review_status")
    private ReviewStatus review_status;

    @Enumerated(EnumType.STRING)
    @Column(name="booking_status")
    private BookingStatus booking_status;

    @Column(name="create_date")
    private LocalDateTime create_date;

    @JoinColumn(name="id" , referencedColumnName = "id",nullable = false)
    @ManyToOne(fetch= FetchType.LAZY)
    private LoginDTO loginDTO;

    @JoinColumn(name = "car_id",nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Car car;

    @JoinColumn(name="carImage_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private CarImages carImages;

    @Column(name = "host_name")
    private String host_name;

    @Column(name = "guest_name")
    private String guest_name;

    //===== 서비스 구현 =====//

    public void setBookingStatus(BookingEntity booking) {
        LocalDate now = LocalDate.now();

        if (now.isBefore(booking.getStart_date())) {
            booking.setBooking_status(BookingStatus.BEFORE);
        } else {
            if (now.isAfter(booking.getEnd_date())) {
                booking.setBooking_status(BookingStatus.AFTER);
            } else {
                booking.setBooking_status(BookingStatus.NOW);
            }
        }
    }

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
