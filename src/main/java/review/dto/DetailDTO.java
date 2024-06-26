package review.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class DetailDTO {

    private Long car_id;
    private String user_id;

    private String car_model;
    private Float rating;
    private String title;
    private String comment;
    private LocalDateTime dateTime;

    private LocalDate startDate;
    private LocalDate endDate;

    private String carModel;

    private Long review_id;

    private List<String> images;
    private Float averageRating;
    private Map<Integer, Integer> ratingCounts;

}
