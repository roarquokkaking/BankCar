package main.dto;

import lombok.*;
import org.apache.kafka.common.security.auth.Login;
import org.joda.time.DateTime;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HomeDTO {
    private LocalDate startDate;
    private LocalDate endDate;
    private String days;
    private List<String> locationImages;
    private double rating;

    private Long carid;
    private int price ;

    private DateTime start_date;
    private DateTime end_date;



    private LocalTime startTime;
    private LocalTime endTime ;

    private Long serviceCarId;


}
