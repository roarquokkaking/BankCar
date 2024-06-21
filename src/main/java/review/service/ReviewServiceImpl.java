package review.service;

import booking.entity.BookingEntity;
import booking.repository.BookingRepository;
import car.entity.Car;
import com.amazonaws.services.kms.model.NotFoundException;
import driverLicense.service.NCPObjectStorageService;
import login.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.web.bind.annotation.RequestMapping;
import review.dto.DetailDTO;
import review.entity.ReviewEntity;
import review.repository.ReviewRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service

public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookingRepository bookingRepository;
    private final NCPObjectStorageService ncpObjectStorageService;


    /**
     * 리뷰 이미지 갖고 오기 .
     * */

    public List<DetailDTO> getReviews(String userId) {
        List<ReviewEntity> reviewEntities = reviewRepository.findReviewsByUserId(userId);
        if (reviewEntities.isEmpty()) {
            throw new NotFoundException("아이디에 관한 정보가 없습니다. ");
        }
        List<DetailDTO> detailDTOList = new ArrayList<>();

        for (ReviewEntity reviewEntity : reviewEntities) {
            BookingEntity booking = reviewEntity.getBookingEntity();
            System.out.println(11111);
            System.out.println("인환");
            if (booking == null) {
                throw new NotFoundException("예약정보를 찾을 수 없습니다.");
            }
//            ncpObjectStorageService.getCarImages("/carImage")

            List<String> images = ReviewEntity.setCarImage(booking);

            DetailDTO detailDTO = DetailDTO.builder()
                    .user_id(booking.getLoginDTO().getId())
                    .car_id(booking.getCar().getCarId())
                    .carModel(booking.getCar().getModel())
                    .rating(booking.getCar().getRating())
                    .title(booking.getCar().getTitle())
//                    .images(images) // 이미지 추가
                    .build();
            detailDTOList.add(detailDTO);
        }

        return detailDTOList;
    }


    /**
     * 점수 주기 설정
     * */
    @Override
    public ReviewEntity saveRating(Float rating, String userId, Long carId) {
        List<ReviewEntity> existingReviews = reviewRepository.findReviewByUserIdAndCarId(userId, carId);
        ReviewEntity reviewEntity;

        if (!existingReviews.isEmpty()) {
            // 기존 리뷰가 존재하면 첫 번째 리뷰를 수정
            reviewEntity = existingReviews.get(0);
            reviewEntity.getBookingEntity().getCar().setRating(rating);
        } else {
            // 기존 리뷰가 존재하지 않으면 새로 생성
            Car car = new Car();
            car.setCarId(carId);
            car.setRating(rating);

            LoginDTO loginDTO = new LoginDTO();
            loginDTO.setId(userId);

            BookingEntity newBookingEntity = BookingEntity.builder()

                    .car(car)
                    .loginDTO(loginDTO)
                    .build();

            reviewEntity = ReviewEntity.builder()
                    .bookingEntity(newBookingEntity)
                    .build();
        }

        // 리뷰 엔티티를 저장
        return reviewRepository.save(reviewEntity);
    }







}










 //   public ReviewEntity saveRating(int rating, ReviewDTO reviewDTO) {
//        // 별점만 저장하는 코드
//
//        ReviewEntity review = reviewRepository.findById(reviewDTO.getReview_id())
//                .orElseThrow(null);
////        review.setRating(reviewDTO.getRating());
//        return reviewRepository.save(review);
//    }

//
//    /**
//     * review save
//     * */
//    @Override
//    public ReviewEntity writeReview(ReviewDTO reviewDTO, String user_id) {
//
//        ReviewEntity reviewEntity = ReviewEntity.builder()
////                .user_id(user_id)
//                .title(reviewDTO.getTitle())
//                .comment(reviewDTO.getComment())
////                .car_id(reviewDTO.getCar_id())
////                .car_model(reviewDTO.getCar_model())
//                .rating(reviewDTO.getRating())
//                .dateTime(LocalDateTime.now())
//                .build();
//        return reviewRepository.save(reviewEntity);
//    }
//
//    /**
//     * 리뷰 서비스 기능
//     **/
//    public double getAverageRating() {
//        return reviewRepository.findAverageRating();
//    }
//
//    public Map<Integer, Integer> getScoreCounts() {
//        Map<Integer, Integer> scoreCounts = new HashMap<>();
//        for (int i = 1; i <= 5; i++) {
//            scoreCounts.put(i, reviewRepository.countByRating(i));
//        }
//        return scoreCounts;
//    }
//
//    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
//
//
///**
// * review service update
// * */
//
//    @Override
//    public ReviewEntity updateReview(String user_id, Long review_id) {
//        ReviewEntity existingReviewEntity = reviewRepository.findByIdAndReviewId(user_id, review_id);
//        if (existingReviewEntity == null) {
//
//            throw new NotFoundException("아이디를 찾지 못했습니다 .");
//        }else {
////            existingReviewEntity.setTitle(existingReviewEntity.getTitle());
////            existingReviewEntity.setComment(existingReviewEntity.getComment());
////            existingReviewEntity.setRating(existingReviewEntity.getRating());
////            existingReviewEntity.setCar_model(existingReviewEntity.getCar_model());
////            existingReviewEntity.setDateTime(existingReviewEntity.getDateTime());
//        }
//        return reviewRepository.save(existingReviewEntity);
//    }
//
//    @Override
//    public void getUpdateSerivce(ReviewDTO reviewDTO) {
//
//        ReviewEntity existingReviewEntity = reviewRepository.findByIdAndReviewId(reviewDTO.getUser_id(), reviewDTO.getReview_id());
//        if (existingReviewEntity == null) {
//            throw new NotFoundException("리뷰 못찾음");
//        }
////        existingReviewEntity.setTitle(reviewDTO.getTitle());
////        existingReviewEntity.setComment(reviewDTO.getComment());
////        existingReviewEntity.setRating(reviewDTO.getRating());
////        existingReviewEntity.setCar_model(reviewDTO.getCarModel());
////        existingReviewEntity.setDateTime(reviewDTO.getDateTime());
//        reviewRepository.save(existingReviewEntity);
//    }
//
//
//
//    /**
//     * 리뷰 삭제하기
//     */
//    @Override
//    public Optional<ReviewEntity> findDeleteReview(String user_id,Long review_id) {
//        return reviewRepository.findDeleteReview(user_id,review_id);
//    }
//
//    @Override
//    public void deleteReview(String user_id,Long review_id) {
////        reviewRepository.delete(user_id,review_id);
//    }

