package car.entity;

import booking.entity.BookingEntity;
import jakarta.persistence.*;
import lombok.Data;
import wishList.entity.WishListEntity;

@Entity
@Data
@Table(name = "CAR_IMAGE")
public class CarImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carImageId;

    @Column
    private String image1;
    @Column
    private String image2;
    @Column
    private String image3;
    @Column
    private String image4;
    @Column
    private String main_image;

}

