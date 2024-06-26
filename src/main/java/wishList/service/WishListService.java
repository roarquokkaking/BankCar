package wishList.service;

import wishList.dto.WishListDTO;
import wishList.entity.WishListEntity;

public interface WishListService {
    //위시리스트 페이징 및 보여지기
    WishListDTO   getWishListById(String user_id,int page, int size);
    //wishlist 생성
//    void addWish(WishListDTO wishListDTO);
//
//    WishListEntity findByWishListIdAndId(String userId, long wishListId);
//
//    void deleteWishList(String userId, long wishListId);


    int findByWishListIdAnduserId(String userId, Long wishlistId);
}

