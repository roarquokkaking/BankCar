package search.bean;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.*;

import java.sql.Time;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SearchDTO {
    private Integer carId;
    
    private String userId;
    
    private String latitude;
    
    private String longitude;
    
    private String jibunAddress;

    private String roadAddress;
    
    private String category;
    
    private String model;
    
    private String color;
    
    private Integer price;
    
    private Date since;
    
    private Date createdDate;
    
    private Float rating;

    private Date startDate;

    private Date endDate;

    private Time startTime;

    private Time endTime;

    private int minPrice;

    private int maxPrice;
}
