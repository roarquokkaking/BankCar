package review.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import review.dto.ReviewDTO;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewEntity {

    @Id
    @GeneratedValue
    private String car_id;

    private String user_id;

    @Column(name = "rating")
    private String rating;

    @Column(name = "title")
    private String title;

    @Column(name = "car_model")
    private String car_model;

    @Column(name = "comment")
    private String comment;

    @Column(name = "dateTime ")
    private LocalDateTime dateTime;

}
