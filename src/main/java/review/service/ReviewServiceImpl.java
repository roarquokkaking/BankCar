package review.service;

import booking.entity.BookingEntity;
import booking.repository.BookingRepository;
import car.entity.Car;
import car.repo.CarRepository;
import com.amazonaws.services.kms.model.NotFoundException;
import driverLicense.service.NCPObjectStorageService;
import jakarta.persistence.EntityNotFoundException;
import login.dao.LoginDAO;
import login.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import review.dto.DetailDTO;
import review.dto.ReviewDTO;
import review.entity.ReviewEntity;
import review.repository.ReviewRepository;
import user.repository.UserProfileDAO;

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
    private  final CarRepository carRepository;
    private final LoginDAO loginDAO;



    /**
     * 리뷰 이미지 갖고 오기 .
     * */
    public DetailDTO getReview(Long bookingId,String userId,Long carId) {
        // 사용자 ID로 부킹 정보를
        // 검색
        Optional<BookingEntity> bookings = bookingRepository.findById(bookingId);
        DetailDTO detailDTO = null;
        System.out.println(bookings);
        // 부킹 정보가 존재하는지 확인
        if (bookings.isPresent()) {
            System.out.println("jj");
            BookingEntity booking = bookings.get();
            // 해당 차량 ID에 대한 리뷰 리스트를 가져옴
            List<ReviewEntity> carReviews = reviewRepository.findReviewsByCarId(carId);

            // carReviews를 통해 CarRatingInfo를 계산
            ReviewEntity.CarRatingInfo carRatingInfo = ReviewEntity.calCarRatingInfo(carReviews);

            // 이미지 리스트를 설정
            List<String> images = ReviewEntity.setCarImage(booking);

            detailDTO = DetailDTO.builder()

                    .car_id(booking.getCar().getCarId())
                    .user_id(booking.getLoginDTO().getId())
                    .startDate(booking.getStart_date())
                    .endDate(booking.getEnd_date())
//                    .title(booking.getCar().getTitle())
                    .rating(booking.getCar().getRating())
                    .carModel(booking.getCar().getModel())
                    .images(images)
                    .averageRating(carRatingInfo.getAverageRating() != null ? carRatingInfo.getAverageRating() : 0.0f)
                    .ratingCounts(carRatingInfo.getRatingCounts())
                    .build();




        }
else {
            throw new NotFoundException("예약이 없습니다.");
        }


        // DetailDTO를 생성

        return detailDTO;
    }
    // 사용자 정의 NotFoundException 클래스
    public class NotFoundException extends RuntimeException {
        public NotFoundException(String message) {
            super(message);
        }
    }


//    public DetailDTO getReview(String userId) {
//        System.out.println("1. getReview 호출됨, userId: " + userId);
//
//        List<ReviewEntity> reviewEntities = bookingRepository.findReviewsByUserId(userId);
//        System.out.println("2. 리뷰 엔티티 리스트: " + reviewEntities);
//
//        if (reviewEntities.isEmpty()) {
//            System.out.println("3. 리뷰 엔티티가 없습니다.");
//            throw new NotFoundException("아이디에 관한 정보가 없습니다.");
//        }
//
//        // 첫 번째 리뷰 엔티티를 사용
//        ReviewEntity reviewEntity = reviewEntities.get(0);
//        System.out.println("4. 첫 번째 리뷰 엔티티: " + reviewEntity);
//
//        BookingEntity booking = reviewEntity.getBookingEntity();
//        if (booking == null) {
//            System.out.println("5. 예약 정보를 찾을 수 없습니다.");
//            throw new NotFoundException("예약정보를 찾을 수 없습니다.");
//        }
//        System.out.println("6. 예약 엔티티: " + booking);
//
//        Long carId = booking.getCar().getCarId();
//        System.out.println("7. 자동차 ID: " + carId);
//
//        List<ReviewEntity> carReviews = reviewRepository.findReviewsByCarId(carId);
//        System.out.println("8. 자동차에 대한 리뷰 엔티티 리스트: " + carReviews);
//
//        ReviewEntity.CarRatingInfo carRatingInfo = ReviewEntity.calCarRatingInfo(carReviews); // 74번째 줄
//        System.out.println("9. 자동차 평점 정보: " + carRatingInfo);
//
//        // 이미지 관련 코드 주석 처리
//        List<String> images = ReviewEntity.setCarImage(booking);
//        System.out.println("10. 이미지 리스트: " + images);
//
//        // DetailDTO 객체 생성
//        DetailDTO detailDTO = DetailDTO.builder()
//                .user_id(booking.getLoginDTO().getId() != null ? booking.getLoginDTO().getId() : null)
//                .car_id(carId)
//                .carModel(booking.getCar().getModel() != null ? booking.getCar().getModel() : null)
//                .images(images) // 이미지 추가 주석 처리
//                .rating(reviewEntity.getRating() != null ? reviewEntity.getRating() : 0.0f) // null 체크 추가
//                .title(reviewEntity.getTitle())
//                .review_id(reviewEntity.getReviewId())
//                .comment(reviewEntity.getComment())
//                .startDate(reviewEntity.getBookingEntity().getStart_date())
//                .endDate(reviewEntity.getBookingEntity().getEnd_date())
//                .averageRating(carRatingInfo.getAverageRating() != null
//                        ? carRatingInfo.getAverageRating() : 0.0f) // null 체크 추가
//                .ratingCounts(carRatingInfo.getRatingCounts())
//                .build();
//
//        System.out.println("11. DetailDTO 객체: " + detailDTO);
//
//        return detailDTO;
//    }





    /**
     * 점수 주기 설정
     * */

    @Override
    public ReviewEntity saveRating(int rating, String userId, Long carId) {
        System.out.println("saveRating 호출됨: rating=" + rating + ", userId=" + userId + ", carId=" + carId);

        List<ReviewEntity> existingReviews = reviewRepository.findReviewByUserIdAndCarId(userId, carId);
        ReviewEntity reviewEntity;

        if (!existingReviews.isEmpty()) {
            System.out.println("기존 리뷰가 존재함: userId=" + userId + ", carId=" + carId);
            // 기존 리뷰가 존재하면 첫 번째 리뷰를 수정
            reviewEntity = existingReviews.get(0);
            reviewEntity.getBookingEntity().getCar().setRating(rating);
            reviewEntity.setRating(rating);
            System.out.println("기존 리뷰 수정됨: reviewId=" );
        } else {
            System.out.println("기존 리뷰가 존재하지 않음: userId=" + userId + ", carId=" + carId);
            // 기존 리뷰가 존재하지 않으면 새로 생성
            Car car = new Car();
            car.setCarId(carId);
            car.setRating(rating);
            System.out.println("새로운 Car 객체 생성됨: carId=" + carId);

            LoginDTO loginDTO = new LoginDTO();
            loginDTO.setId(userId);

            BookingEntity newBookingEntity = BookingEntity.builder()
                    .car(car)
                    .loginDTO(loginDTO)
                    .build();

            System.out.println("새로운 BookingEntity 생성됨: carId=" + carId + ", userId=" + userId);

            reviewEntity = ReviewEntity.builder()
                    .bookingEntity(newBookingEntity)
                    .build();
            System.out.println("새로운 ReviewEntity 생성됨");
        }

        // 리뷰 엔티티를 저장
        ReviewEntity savedReview = reviewRepository.save(reviewEntity);
        System.out.println("리뷰 엔티티 저장됨: reviewId=" );

        return savedReview;
    }


    public void writeReview(ReviewDTO reviewDTO) {
        String userId = reviewDTO.getUser_id();
        Long carId = reviewDTO.getCar_id();

        System.out.println("Received userId: " + userId);
        System.out.println("Received carId: " + carId);

        // 사용자 정보 조회
        LoginDTO userEntity = loginDAO.findById(userId)
                .orElseThrow(() -> {
                    System.out.println("User not found for userId: " + userId);
                    return new NotFoundException("아이디에 관한 정보가 없습니다.");
                });

        System.out.println("Found userEntity: " + userEntity);

        // 차량 정보 조회
        Car carEntity = carRepository.findById(carId)
                .orElseThrow(() -> {
                    System.out.println("Car not found for carId: " + carId);
                    return new NotFoundException("차량에 관한 정보가 없습니다.");
                });

        System.out.println("Found carEntity: " + carEntity);

        // 리뷰 엔티티 생성
        ReviewEntity reviewEntity = ReviewEntity.builder()
                .title(reviewDTO.getTitle())
                .comment(reviewDTO.getComment())
                .reviewWrite(true)
                .loginDTO(userEntity)
                .car(carEntity)
                .rating(reviewDTO.getRating())
                .build();

        System.out.println("Created reviewEntity: " + reviewEntity);

        // 리뷰 저장
        reviewRepository.save(reviewEntity);
        System.out.println("Review saved successfully for userId: " + userId + " and carId: " + carId);
    }
    /**
     * 리뷰 서비스 저장하기
     * */
//    public ReviewEntity writeReview(String userId, Long carId, String title, String comment) {
//        // 기존 리뷰가 존재하는지 확인
//        LoginDTO user = LoginDAO.findByUserId(userId).orElseThrow(()
//                -> new RuntimeException("User not found"));
//        Car car = carRepository.findById(carId).orElseThrow(()
//                -> new RuntimeException("Car not found"));
//
//        // 기존 리뷰가 있는지 확인
//        ReviewEntity review = reviewRepository.findByUserAndCar(userId, carId);
//
//        if (review != null) {
//            // 기존 리뷰가 있으면 업데이트
//            review.setTitle(title);
//            review.setComment(comment);
//        } else {
//            // 기존 리뷰가 없으면 새로 작성
//            review = new ReviewEntity();
//            review.setId(user);
//            review.setCar(car);
//            review.setTitle(title);
//            review.setComment(comment);
//        }
//
//        return reviewRepository.save(review);
//    }


}




