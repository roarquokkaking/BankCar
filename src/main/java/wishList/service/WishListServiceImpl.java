package wishList.service;

import car.entity.Car;
import car.entity.CarImages;
import car.repo.CarRepository;
import com.amazonaws.services.kms.model.NotFoundException;
import login.dao.LoginDAO;
import login.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import user.dto.UserProfileDTO;
import wishList.dto.WishListDTO;
import wishList.entity.WishListEntity;
import wishList.repository.WishListRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService {


    private final WishListRepository wishListRepository;
    private final CarRepository  carRepository ;
    private final LoginDAO loginDAO;

    @Override
    public List<WishListEntity> toggleWish(String userId, Long carId) {
        System.out.println(userId);
        System.out.println(carId);

        Car car = carRepository.findById(carId).orElseThrow(() -> new NotFoundException("선택하신 차량이 없습니다 ."));

        Optional<WishListEntity> wishChoice = wishListRepository.findByUserIdAndCarId(userId, carId);

        if (wishChoice.isPresent()) {
            WishListEntity existingWish = wishChoice.get();
            if (existingWish.isWish()) {
                wishListRepository.delete(existingWish);
            }
        } else {
            // 위시 상태가 false이거나 존재하지 않는 경우 저장
            WishListEntity.WishListEntityBuilder builder = WishListEntity.builder();
            WishListEntity wishListEntity = builder
                    .car(car)
                    .wish(true)
                    .build();
            wishListRepository.save(wishListEntity);
        }

        System.out.println(5555555);
        return wishListRepository.findAllByUserId(userId);
    }


    public WishListDTO getWishListById(String userId, int page, int size) {
        WishListDTO wishListDTO = new WishListDTO();

        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<WishListEntity> wishListPage = wishListRepository.findByUserId(userId, pageable);

            if (wishListPage.isEmpty()) {
                throw new WishlistNotFoundException("리스트가 비어 있습니다.");
            }

            wishListPage.getContent().stream()
                    .map(entity -> {
                        WishListDTO dto = new WishListDTO();
                        Car car = entity.getCar();
                        dto.setModel(car.getModel());
                        dto.setTitle(car.getTitle());
                        dto.setId(car.getUser().getId());
                        dto.setCarId(car.getCarId());

                        // CarImages 객체 생성 및 이미지 URL 설정
                        CarImages carImages = new CarImages();
                        String baseUrl = "https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/carImage/";
                        String imageName = carImages.getMain_image();
                        String imageUrl = baseUrl + imageName;
                        dto.setImageUrl(imageUrl);

                        return dto;
                    })
                    .forEach(wishListDTO.getWishList()::add);

        } catch (WishlistNotFoundException e) {
            System.err.println("Error: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
        }
        return wishListDTO;
    }



    public class WishlistNotFoundException extends RuntimeException {
        public WishlistNotFoundException(String message) {
            super(message);
        }
    }



    /*toggle 좋아요 수정 삭제 */
//
//    @Override
//    public int findByWishListIdAnduserId(String userId) {
//        Optional<WishListEntity> findLike = wishListRepository.findByWishlistIdAndUserId(userId);
//
//        if (findLike.isEmpty()) {
//            // userId로 사용자 정보 찾기
//            LoginDTO loginDTO = loginDAO.findById(userId)
//                    .orElseThrow(() -> new NoSuchElementException("유저가 없습니다 ."));
//            // wishlistId로 위시리스트 항목 찾기
////            WishListEntity wishListEntity = wishListRepository.findById(wishlistId)
////                    .orElseThrow(() -> new NoSuchElementException("위시 리스트를 찾을 수 없습니다."));
//
//            // 새로운 WishListEntity 생성 및 저장
//            WishListEntity newWishListEntity = new WishListEntity();
//
//            newWishListEntity.setLoginDTO(loginDTO);
////            newWishListEntity.setWishlistId(wishListEntity.getWishlistId());
//            newWishListEntity.setWish(1); // 기본적으로 즐겨찾기 상태로 설정
//
//            wishListRepository.save(newWishListEntity);
//
//            return 1;
//        } else {
//            wishListRepository.delete(findLike.get());
//            return 0;
//        }
//    }



//    /**
//     * 위시 리스트 생성
//     * */
//    @Override
//    public void addWish(WishListDTO wishListDTO) {
//
//        LoginDTO loginDTO = loginDAO.findById(wishListDTO.getId()).get();
//        Car car = carRepository.findById(Long.valueOf(wishListDTO.getCarId())).orElseThrow();
//
//        WishListEntity wishListEntity = WishListEntity
//                .builder()
//                .loginDTO(loginDTO)
//                .car(car)
//                .build();
//
//        wishListRepository.save(wishListEntity);
//
//    }
//    /**
//     * 위시 리스트 삭제 .
//     */
//    @Override
//    public WishListEntity findByWishListIdAndId(String user_id, long id) {
//        return wishListRepository.findByUserIdAndId(user_id, id);
//    }
//    @Override
//    public void deleteWishList(String userId, long wishListId) {
//        wishListRepository.deleteByWishlistIdAndUserId(wishListId,userId
//        );
//    }

}
