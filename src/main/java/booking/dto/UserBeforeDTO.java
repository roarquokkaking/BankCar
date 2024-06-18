package booking.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalTime;

@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserBeforeDTO {


    private String userid;
    private Long carid;
    private String model;
    private String color;
    private String category;
    private String doro;
    private String title;
    private String content;
    private LocalTime startTime;
    private LocalTime endTime;
//    private enum  Bookingstatus;
    private Float rating;
    private String imageUrl;
}
