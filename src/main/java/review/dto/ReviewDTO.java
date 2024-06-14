package review.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ReviewDTO {
    private String car_id;

    private String user_id;
    private String rating;

    private String title;

    private String comment;
    private String car_model;
    private LocalDateTime dateTime;


}
