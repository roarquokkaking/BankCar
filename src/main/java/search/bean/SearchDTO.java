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
    @Id
    @Column(name="car_id")
    private Integer carId;
    
    @Column(name="user_id", nullable=false)
    private String userId;
    
    @Column(name="latitude")
    private String latitude;
    
    @Column(name="longitude")
    private String longitude;
    
    @Column(name="jibunAddress")
    private String jibunAddress;

    @Column(name="roadAddress")
    private String roadAddress;
    
    @Column(name="category")
    private String category;
    
    @Column(name="model")
    private String model;
    
    @Column(name="color")
    private String color;
    
    @Column(name="price")
    private Integer price;
    
    @Column(name="since")
    private Date since;
    
    @Column(name="created_date")
    private Date createdDate;
    
    @Column(name="rating")
    private Float rating;

    @Column(name = "startDate")
    private Date startDate;

    @Column(name = "endDate")
    private Date endDate;

    @Column(name = "startTime")
    private Time startTime;

    @Column(name = "endTime")
    private Time endTime;

    @Column(name = "minPrice")
    private int minPrice;

    @Column(name = "maxPrice")
    private int maxPrice;
}
