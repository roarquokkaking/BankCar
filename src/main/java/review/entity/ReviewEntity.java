package review.entity;

import booking.entity.BookingEntity;
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

//    @Column(name = "rating")
//    private int rating;

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

    public static List<String> setCarImage(BookingEntity booking) {
        List<String> images = new ArrayList<>();
        images.add(booking.getCar().getCarImages().getMain_image());
        images.add(booking.getCar().getCarImages().getImage1());
        images.add(booking.getCar().getCarImages().getImage2());
        images.add(booking.getCar().getCarImages().getImage3());
        images.add(booking.getCar().getCarImages().getImage4());
        return images;
    }
}
