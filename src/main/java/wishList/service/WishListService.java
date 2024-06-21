package wishList.service;

import org.springframework.data.domain.Pageable;
import wishList.dto.WishListDTO;
import wishList.entity.WishListEntity;


import java.util.List;

public interface WishListService {
    //위시리스트 페이징 및 보여지기
 //   WishListDTO   getWishListById(String user_id,int page, int size);
    //wishlist 생성
//    void addWish(WishListDTO wishListDTO);
//
//    WishListEntity findByWishListIdAndId(String userId, long wishListId);
//
//    void deleteWishList(String userId, long wishListId);


//    int findByWishListIdAnduserId(String userId);

    List<WishListEntity> toggleWish(String userId, Long carId) ;

    List<WishListDTO> getWishListById(String userId, Pageable pageable);
}

