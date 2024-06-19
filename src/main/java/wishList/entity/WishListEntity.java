package wishList.entity;

import car.entity.Car;
import car.entity.CarImages;
import login.dto.LoginDTO;
import lombok.*;
import wishList.dto.WishListDTO;

import javax.persistence.*;

@Entity
@Table(name = "wishList")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WishListEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="wishlist_id" )
    private Long wishlistId;

    @Column(name="wish")
    private boolean wish;
    
    @JoinColumn(name = "car_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Car car ;

    @JoinColumn(name = "id")
    @ManyToOne(fetch = FetchType.LAZY)
    private LoginDTO loginDTO;

    @JoinColumn
    @OneToOne(fetch = FetchType.LAZY)
    private CarImages carImages;

    public void setCarImage (String wishlist){

        WishListDTO wishListDTO =new WishListDTO();
        String baseUrl = "https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/wishlist/";
        String imageName = getCarImages().getMain_image();
        String imageUrl = baseUrl + imageName;
        wishListDTO.setImageUrl(imageUrl);


        //보고 수정해서 이미지 갖고오기
    }

}
