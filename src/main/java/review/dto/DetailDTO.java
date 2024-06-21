package review.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class DetailDTO {
    private Long car_id;
    private String car_model;
    private String user_id;

    private Float rating;

    private String title;
    private String comment;
    private LocalDateTime dateTime;

    private String carModel;

    private Long review_id;


}
