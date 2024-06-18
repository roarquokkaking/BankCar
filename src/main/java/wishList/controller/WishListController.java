package wishList.controller;



import login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wishList.dto.WishListDTO;
import wishList.entity.WishListEntity;
import wishList.service.WishListService;
import wishList.service.WishListServiceImpl;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping(path="/WishList")
public class WishListController {

    private final WishListService wishListService ;
    private final LoginService loginService;


    @PostMapping("/wish/toggle/{userId}/{carId}")
    public ResponseEntity<List<WishListEntity>> toggleWish(@PathVariable("userId") String userId,
                                                           @PathVariable("carId") Long carId){
        System.out.println(userId);
        try {
            List<WishListEntity> updatedCards = wishListService.toggleWish(userId , carId);
            System.out.println(userId);
            System.out.println(11111);
            return ResponseEntity.ok(updatedCards);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




















    //    /**
//     * 위시 리스트 등록
//     * */
//    @PostMapping(path = "/AddWishList")
//    public void addWishList(@RequestBody WishListDTO wishListDTO) {
//        wishListService.addWish(wishListDTO);
//    }

    /*like Toggle*/

   /* @PostMapping("/wish/toggle/{user_id}")
    public int toggleWish (@PathVariable("user_id")@Validated String user_id ){
        int wish = wishListService.findByWishListIdAnduserId(user_id);
        System.out.println(user_id);
        System.out.println("여기 까지 됨 ");
        return wish;

    }*/


    /**
    * 위시 리스트 뽑기 .
    **/
    @GetMapping(path = "/MyWishList/{user_id}")
    public ResponseEntity<WishListDTO> getWishListById(@PathVariable String userId,
//                                                       @PathVariable Long carId ,
                                                       @RequestParam(defaultValue = "0",value = "page") int page,
                                                       @RequestParam(defaultValue = "5",value = "size") int size) {

        System.out.println(111111);

        try {
            WishListDTO wishListDTO = wishListService.getWishListById(userId, page, size);
            return ResponseEntity.ok(wishListDTO);
        } catch (WishListServiceImpl.WishlistNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new WishListDTO());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new WishListDTO());
        }
    }


/**
 * 위시 리스트 삭제
 */
//@DeleteMapping(path = "/ToggleFavorite/{user_id}/{wishList_id}")
//public ResponseEntity<Void> deleteWish(@PathVariable("user_id") @Valid String user_id,
//                                       @PathVariable("wishList_id") @Valid long wishList_id) {
//
//    WishListEntity wish = wishListService.findByWishListIdAndId(user_id, wishList_id);
//    if (wish == null) {
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//    }else{
//        wishListService.deleteWishList(user_id, wishList_id);
//    }
//    return ResponseEntity.noContent().build();}
}
