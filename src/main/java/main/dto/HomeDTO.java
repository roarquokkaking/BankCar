package main.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.kafka.common.security.auth.Login;
import org.joda.time.DateTime;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class HomeDTO {
    private Long booking_id;
    private String days;
    private List<String> locationImages;
    private double rating;

    private Long carid;
    private int price ;

    private DateTime start_date;
    private DateTime end_date;

}
