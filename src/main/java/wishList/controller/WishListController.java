package wishList.controller;



import com.amazonaws.services.kms.model.NotFoundException;
import login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wishList.dto.WishListDTO;
import wishList.entity.WishListEntity;
import wishList.service.WishListService;
import wishList.service.WishListServiceImpl;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping(path="/api/WishList")
public class  WishListController {

    private final WishListService wishListService;
    private final LoginService loginService;



    @PostMapping("/wish/toggle/{userId}/{car_id}")
    public ResponseEntity<List<WishListDTO>> toggleWish(@PathVariable("userId") String userId,
                                                           @PathVariable("car_id") Long carId

    ) {
        System.out.println(carId + "carId");
        System.out.println(userId);
        System.out.println(carId);
        try {
            System.out.println(123123);
            List<WishListEntity> updatedCards = wishListService.toggleWish(userId, carId);
            System.out.println("2222222");
            List<WishListDTO> wishListDTOList = new ArrayList<>();
            for(WishListEntity wishListEntity : updatedCards){
                System.out.println("이미지 uuid"+ wishListEntity.getCar().getCarImages());
                WishListDTO wishListDTO = WishListDTO.builder()
                        .wish(true)
                        .id(userId)
                        .title(wishListEntity.getCar().getTitle())
                        .carId(wishListEntity.getCar().getCarId())
                        //.imageUrl(wishListEntity.getCar().getCarImages().getMain_image())
                        .build();
                wishListDTOList.add(wishListDTO);
            }
            System.out.println(userId);
            System.out.println(11111);
            return ResponseEntity.ok(wishListDTOList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    /**
     * 위시 리스트 뽑기 .
     **/
    @GetMapping(path = "/MyWishList/{user_id}")
    public ResponseEntity<List<WishListDTO>> getWishListByUserId(@PathVariable("user_id") String userId,
                                                                 @RequestParam(name="page" , defaultValue = "0") int page,
                                                                 @RequestParam(name = "size", defaultValue = "5") int size) {

        try {

            Pageable pageable = PageRequest.of(page , size); // 페이지는 0부터 시작하므로 -1을 해줍니다.
            List<WishListDTO> wishList = wishListService.getWishListById(userId, pageable);
            System.out.println(userId);
            return ResponseEntity.ok(wishList);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }

    @GetMapping(path = "/users/{userId}")
    public ResponseEntity<List<Long>> getWishListByUserId(@PathVariable(value = "userId")String userId){
        return ResponseEntity.ok(wishListService.getWishListByUserId(userId));
    }

}
