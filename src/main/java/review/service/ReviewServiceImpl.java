package review.service;

import com.amazonaws.services.kms.model.NotFoundException;
import org.springframework.transaction.annotation.Transactional;
import review.dto.ReviewDTO;
import review.entity.ReviewEntity;
import review.repository.ReviewRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    /**
     * review save
     * */
    @Override
    public ReviewEntity writeReview(ReviewDTO reviewDTO, String user_id) {

        ReviewEntity reviewEntity = ReviewEntity.builder()
                .user_id(user_id)
                .title(reviewDTO.getTitle())
                .comment(reviewDTO.getComment())
                .car_id(reviewDTO.getCar_id())
                .car_model(reviewDTO.getCar_model())
                .rating(reviewDTO.getRating())
                .dateTime(LocalDateTime.now())
                .build();
        return reviewRepository.save(reviewEntity);
    }

    /**
     * 리뷰 서비스 기능
     **/
    public double getAverageRating() {
        return reviewRepository.findAverageRating();
    }

    public Map<Integer, Integer> getScoreCounts() {
        Map<Integer, Integer> scoreCounts = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            scoreCounts.put(i, reviewRepository.countByRating(i));
        }
        return scoreCounts;
    }
    public ReviewEntity saveRating(int rating, ReviewDTO reviewDTO) {
        // 별점만 저장하는 코드

        ReviewEntity review = reviewRepository.findById(reviewDTO.getReview_id())
                .orElseThrow(null);
        review.setRating(reviewDTO.getRating());
        return reviewRepository.save(review);
    }
    /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


/**
 * review service update
 * */

    @Override
    public ReviewEntity updateReview(String user_id, Long review_id) {
        ReviewEntity existingReviewEntity = reviewRepository.findByIdAndReviewId(user_id, review_id);
        if (existingReviewEntity == null) {

            throw new NotFoundException("아이디를 찾지 못했습니다 .");
        }else {
            existingReviewEntity.setTitle(existingReviewEntity.getTitle());
            existingReviewEntity.setComment(existingReviewEntity.getComment());
            existingReviewEntity.setRating(existingReviewEntity.getRating());
            existingReviewEntity.setCar_model(existingReviewEntity.getCar_model());
            existingReviewEntity.setDateTime(existingReviewEntity.getDateTime());
        }
        return reviewRepository.save(existingReviewEntity);
    }

    @Override
    public void getUpdateSerivce(ReviewDTO reviewDTO) {

        ReviewEntity existingReviewEntity = reviewRepository.findByIdAndReviewId(reviewDTO.getUser_id(), reviewDTO.getReview_id());
        if (existingReviewEntity == null) {
            throw new NotFoundException("리뷰 못찾음");
        }
        existingReviewEntity.setTitle(reviewDTO.getTitle());
        existingReviewEntity.setComment(reviewDTO.getComment());
        existingReviewEntity.setRating(reviewDTO.getRating());
        existingReviewEntity.setCar_model(reviewDTO.getCarModel());
        existingReviewEntity.setDateTime(reviewDTO.getDateTime());
        reviewRepository.save(existingReviewEntity);
    }



    /**
     * 리뷰 삭제하기
     */
    @Override
    public Optional<ReviewEntity> findDeleteReview(String user_id,Long review_id) {
        return reviewRepository.findDeleteReview(user_id,review_id);
    }

    @Override
    public void deleteReview(String user_id,Long review_id) {
//        reviewRepository.delete(user_id,review_id);
    }
}
