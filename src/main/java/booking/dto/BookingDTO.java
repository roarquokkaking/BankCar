package booking.dto;

import login.dto.LoginDTO;
import lombok.*;
import org.joda.time.LocalDateTime;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingDTO {

    private String userId;
    private Long booking_id;


    private LocalDate start_date;
    private LocalDate end_date;
    private LocalTime start_time;
    private LocalTime end_time;
    private String status;
    private String title ;
    private String content;
    private String host_name;
    private String guest_name;
    private Long carId ;
    private String period;
    private String imageUrl;
    private String carModel;
    private LocalDateTime create_date;
    private LoginDTO loginDTO;
    private Float rating;
    private String driverName;
    private boolean reviewWrite;
    private Long reviewId;




}
