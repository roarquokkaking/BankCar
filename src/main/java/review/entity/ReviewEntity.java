package review.entity;

import booking.entity.BookingEntity;
import car.entity.Car;
import jakarta.persistence.*;
import login.dto.LoginDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "reviews")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long review_id;

    @Column(name = "review_write")
    private Boolean reviewWrite;

    @Column(name = "rating")
    private Float rating;

    @Column(name = "title")
    private String title;

    @Column(name = "comment")
    private String comment;

//    @Column(name = "dateTime")
//    private LocalDateTime dateTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private LoginDTO loginDTO;

    @JoinColumn(name = "booking_id")
    @OneToOne(fetch = FetchType.LAZY)
    private BookingEntity bookingEntity;

    @JoinColumn(name=" car")
    @ManyToOne(fetch = FetchType.LAZY)
    private Car car  ;




    public static List<String> setCarImage(BookingEntity booking) {
        List<String> images = new ArrayList<>();
        if(booking.getCar().getCarImages().getMain_image()!=null)
            images.add(booking.getCar().getCarImages().getMain_image());
        if(booking.getCar().getCarImages().getImage1()!=null)
            images.add(booking.getCar().getCarImages().getImage1());
        if(booking.getCar().getCarImages().getImage2()!=null)
            images.add(booking.getCar().getCarImages().getImage2());
        if(booking.getCar().getCarImages().getImage3()!=null)
            images.add(booking.getCar().getCarImages().getImage3());
        if(booking.getCar().getCarImages().getImage4()!=null)
            images.add(booking.getCar().getCarImages().getImage4());
        return images;
    }
}
