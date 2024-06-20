package choice.dto;

import car.entity.CarImages;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CarDTO {
    private Long carId;
    private UserDTO user;
    private String title;
    private String content;
    private String latitude;
    private String longitude;
    private String doroAddress;
    private String jibunAddress;
    private String category;
    private String model;
    private String released;
    private String color;
    private String segment;
    private int price;
    private float rating;
    private int wish;
    private LocalDateTime createDate;
    private CarImages carImages;
    // getters and setters
}
