package choice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CarDTO {
    private Long carId;
    private String userId;
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
    // getters and setters
}
