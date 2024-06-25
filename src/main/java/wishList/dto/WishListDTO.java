package wishList.dto;

import lombok.*;
import org.checkerframework.checker.units.qual.A;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WishListDTO {


    private String imageUrl;
    private String title; 
    private String comment ; 
    private String model;
    private String average;
    private String isFavorite;
    private boolean wish;


    private String id;
    private Long carId;


    private Object loginDTO;





}
