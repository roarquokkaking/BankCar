package review;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RatingDTO {
    private  Float rating;
    private String user_id ;
    private Long car_id;
    private Long review_id;
}
