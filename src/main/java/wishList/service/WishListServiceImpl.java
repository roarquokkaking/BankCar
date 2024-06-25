package wishList.service;

import car.entity.Car;
import car.entity.CarImages;
import car.repo.CarRepository;
import com.amazonaws.services.kms.model.NotFoundException;
import login.dao.LoginDAO;
import login.dto.LoginDTO;
import login.service.LoginService;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wishList.dto.WishListDTO;
import wishList.entity.WishListEntity;
import wishList.repository.WishListRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;


@Service
@Transactional
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService {


    private final WishListRepository wishListRepository;
    private final CarRepository  carRepository ;
    private final LoginService loginService;


    /**
     * 위시리스트 만들기
     * */
    @Override
    public List<WishListEntity> toggleWish(String userId, Long carId) {

        Car car = carRepository.findById(carId).orElseThrow(() -> new NotFoundException("선택하신 차량이 없습니다 ."));

        Optional<LoginDTO> loginDTO = loginService.findById(userId);

        Optional<WishListEntity> wishChoice = wishListRepository.findByUserIdAndCarId(userId, carId);
        System.out.println(112231213);
        if (wishChoice.isPresent()) {
            WishListEntity existingWish = wishChoice.get();
            if (existingWish.isWish()) {
                wishListRepository.delete(existingWish);
            }
        } else {
            WishListEntity.WishListEntityBuilder builder = WishListEntity.builder();
            WishListEntity wishListEntity = builder
                    .car(car)
                    .loginDTO(loginDTO.get())
                    .wish(true)
                    .build();
            wishListRepository.save(wishListEntity);
        }

        return wishListRepository.findAllByUserId(userId);
    }


/**
* 페이징 처리하기
* */
public List<WishListDTO> getWishListById(String userId, Pageable pageable) {
    List<WishListDTO> wishList = new ArrayList<>();

    try {
        System.out.println("ddddddd");
        Page<WishListEntity> wishListPage = wishListRepository.findWishListByUserIdAndWishIsTrue(userId, pageable);

        System.out.println("222222");
        if (wishListPage.isEmpty()) {
            throw new NotFoundException("없당");
        }

        System.out.println(wishListPage);
        wishList = wishListPage.getContent().stream()
                .map(entity -> {
                    WishListDTO dto = new WishListDTO();
                    Car car = entity.getCar();
                    dto.setModel(car.getModel());
                    dto.setTitle(car.getTitle());
                    dto.setTitle(car.getCategory());
                    dto.setId(car.getUser().getId());
                    dto.setCarId(car.getCarId());
                    dto.setImageUrl(car.getCarImages().getMain_image());
                    // CarImages 객체 생성 및 이미지 URL 설정
//                     CarImages carImages = car.getCarImages();
//                     String baseUrl = "https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/carImage/";
//                     String imageName = carImages.getMain_image();
//                     String imageUrl = baseUrl + imageName;
//                     dto.setImageUrl(imageUrl);

                    return dto;
                })
                .collect(Collectors.toList());

    } catch (Exception e) {
        System.err.println("Unexpected error: " + e.getMessage());
    }

    return wishList;
}

    @Override
    public List<Long> getWishListByUserId(String userId) {
        List<Long> list = wishListRepository.getWishListByUserId(userId);
        return list;

    }


    public class WishlistNotFoundException extends RuntimeException {
        public WishlistNotFoundException(String message) {
            super(message);
        }
    }



}
