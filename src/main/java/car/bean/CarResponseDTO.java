package car.bean;

import car.entity.Car;
import car.entity.CarImages;
import login.dto.LoginDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@SuperBuilder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarResponseDTO {
    private Long carId;
    private LoginDTO user;
    private CarImages carImages;
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
    private LocalDateTime createdDate;
    private float rating;

}
