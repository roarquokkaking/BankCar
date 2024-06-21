package review.service;


import review.dto.DetailDTO;
import review.entity.ReviewEntity;

import java.util.List;

public interface ReviewService {
    List<DetailDTO> getReviews(String userId);

    ReviewEntity saveRating(Float rating, String userId, Long carId);


//    ReviewEntity writeReview(ReviewDTO reviewDTO, String user_id);
//
//    double getAverageRating();
//
//    Map<Integer, Integer> getScoreCounts();
//
//    /*별점 저장하기 */
//    ReviewEntity saveRating(int rating, ReviewDTO reviewDTO);
//
//
//
//    /*update*/
//    ReviewEntity updateReview(String user_id , Long review_id);
//    void getUpdateSerivce(ReviewDTO reviewDTO);
//
//
//    /*delete*/
//    Optional<ReviewEntity> findDeleteReview(String user_id,Long review_id);
//    void deleteReview(String user_id,Long review_id);
//



//    List<ReviewEntity> writeReview(ReviewDTO reviewDTO);
}
