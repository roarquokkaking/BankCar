package search.bean;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="CAR")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
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
    
    @Column(name="address")
    private String address;
    
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
}
