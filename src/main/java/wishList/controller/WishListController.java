package wishList.controller;



import login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import wishList.dto.WishListDTO;
import wishList.service.WishListService;
import wishList.service.WishListServiceImpl;

@RestController
@RequiredArgsConstructor
@RequestMapping(path="/WishList")
public class WishListController {

    private final WishListService wishListService ;
    private final LoginService loginService;

//    /**
//     * 위시 리스트 등록
//     * */
//    @PostMapping(path = "/AddWishList")
//    public void addWishList(@RequestBody WishListDTO wishListDTO) {
//        wishListService.addWish(wishListDTO);
//    }

    /*like Toggle*/

    @PostMapping("/wilst/toggle/{user_id}/{wishList_id}")
    public int toggleWish (@PathVariable("user_id")@Validated String user_id ,
                                   @PathVariable("wishList_id") Long wishlist_id){
        int wish = wishListService.findByWishListIdAnduserId(user_id, wishlist_id);

        return wish;

    }


    /**
    * 위시 리스트 뽑기 .
    **/
    @GetMapping(path = "/MyWishList/{user_id}")
    public ResponseEntity<WishListDTO> getWishListById(@PathVariable("user_id")
                                                           @Validated String userId,
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
