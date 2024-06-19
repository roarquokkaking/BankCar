package car.entity;

import booking.entity.BookingEntity;
import lombok.Data;
import wishList.entity.WishListEntity;

import javax.persistence.*;

@Entity
@Data
@Table(name = "CAR_IMAGE")
public class CarImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long carImageId;

    @OneToOne(mappedBy = "carImages")
    private Car car;
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

    @JoinColumn
    @OneToOne(fetch = FetchType.LAZY)
    private WishListEntity wishListEntity;


    @JoinColumn(name="booking_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private BookingEntity bookingEntity;


}

