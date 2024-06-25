package review.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ReviewDTO {
    private String user_id;
    private Long car_id;
    private String title;
    private String comment;
    private Integer rating;
}
