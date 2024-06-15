package review.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
    private Long review_id;

    private Long car_id;

    private String user_id;

    @Column(name = "rating")
    private int rating;

    @Column(name = "title")
    private String title;

    @Column(name = "car_model")
    private String car_model;

    @Column(name = "comment")
    private String comment;

    @Column(name = "dateTime ")
    private LocalDateTime dateTime;

}
