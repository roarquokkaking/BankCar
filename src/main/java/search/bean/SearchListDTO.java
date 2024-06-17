package search.bean;

import java.sql.Time;
import java.util.List;

import org.joda.time.DateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SearchListDTO {
    private Long booking_id;

    private String days;

    private List<String> locationImages;

    private double rating;

    private Long carid;

    private int price ;

    private DateTime start_date;

    private DateTime end_date;

    private Time startTime;

    private Time endTime;
}