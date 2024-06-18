package booking.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class BookingUseDTO {
    private String model ;
    private String segment ;
    private String color;
    private String period;
    private Float rating ;
    private String price;
    private String category;
    private String hostName;
    private String imageUrl ;
    private Long booking_id;
    private Long carId;
//    private LocalDate startDate;
//    private LocalDate endDate ;

}
