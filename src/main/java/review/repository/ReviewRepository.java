//package review.repository;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;
//import review.entity.ReviewEntity;
//
//import java.util.Optional;
//
//@Transactional
//@Repository
//public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
//
//    /*리뷰 카운팅 하기 */
//    @Query("SELECT AVG(r.rating) FROM ReviewEntity r")
//    double findAverageRating();
//
//    @Query("SELECT COUNT(r) FROM ReviewEntity r WHERE r.rating = :rating")
//    int countByRating(int rating);
//
//    /*리뷰 수정하기 */
//    @Query("SELECT r FROM ReviewEntity r " +
//            "WHERE r.user_id = :userId " +
//            "AND r.review_id = :reviewId")
//    Optional<ReviewEntity> findByUserIdAndReviewId(@Param("userId") String userId, @Param("reviewId") String reviewId);
//
//
//
//    @Query("SELECT r FROM ReviewEntity r " +
//            "WHERE r.user_id = :userId " +
//            "AND r.review_id = :reviewId")
//    ReviewEntity findByIdAndReviewId(String userId, Long reviewId);
//
//    /*리뷰 삭제하기 */
//    @Query("SELECT r FROM ReviewEntity r " +
//            "WHERE r.user_id = :userId " +
//            "AND r.review_id =: reviewId" )
//    Optional<ReviewEntity> findDeleteReview(@Param("user_id") String userId ,@Param("review_id")Long review_id);
//
//
//}
