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

    public void convertToCarDTO(Car car) {
        this.carId = car.getCarId();
        this.carImages = car.getCarImages();
        this.color = car.getColor();
        this.content = car.getContent();
        this.category = car.getCategory();
        this.createdDate = car.getCreatedDate();
        this.doroAddress = car.getDoroAddress();
        this.jibunAddress = car.getJibunAddress();
        this.latitude = car.getLatitude();
        this.longitude = car.getLongitude();
        this.model = car.getModel();
        this.price = car.getPrice();
        this.rating = car.getRating();
        this.released = car.getReleased();
        this.segment = car.getSegment();
        this.title = car.getTitle();
        this.user = car.getUser();
    }

}
