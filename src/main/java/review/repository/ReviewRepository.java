package review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import review.entity.ReviewEntity;

import java.util.List;

@Transactional
@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {


        @Query("SELECT r FROM ReviewEntity r " +
                "JOIN FETCH r.bookingEntity b " +
                "JOIN FETCH b.car c " +
                "LEFT JOIN FETCH c.carImages " +
                "WHERE r.loginDTO.id = :userId")
        List<ReviewEntity> findReviewsByUserId(@Param("userId") String userId);

        @Query("SELECT r FROM ReviewEntity r" +
                " JOIN r.bookingEntity b " +
                "JOIN b.loginDTO u " +
                "JOIN b.car c" +
                " WHERE u.id = :userId " +
                "AND c.carId = :carId")
        List<ReviewEntity> findReviewByUserIdAndCarId(@Param("userId") String userId, @Param("carId") Long carId);

        List<ReviewEntity> findByCar_CarId(Long carId);


//        void findByUserIdAndCarId(String userId, Long carId, Long rating);


//        @Query("select r Form ReviewEntity r + Join fetch r.bookingEntity b + ")
//        void findByUserIdAndCarId(String userId, Long carId);


        //    @Query("SELECT r FROM ReviewEntity r " +
//            "WHERE r.loginDTO.id = :userId " +
//            "AND r.review_id = :reviewId")
//    ReviewEntity findByIdAndReviewId(String userId, Long reviewId);




//    /*리뷰 카운팅 하기 */
//    @Query("SELECT AVG(r.rating) FROM ReviewEntity r")
//    double findAverageRating();
//
//    @Query("SELECT COUNT(r) FROM ReviewEntity r WHERE r.rating = :rating")
//    int countByRating(int rating);
//
//    /*리뷰 수정하기 */
//    @Query("SELECT r FROM ReviewEntity r " +
//            "WHERE r.loginDTO.id = :userId " +
//            "AND r.review_id = :reviewId")
//    Optional<ReviewEntity> findByUserIdAndReviewId(@Param("userId") String userId, @Param("reviewId") String reviewId);
//
//
//

//
//    /*리뷰 삭제하기 */
//    @Query("SELECT r FROM ReviewEntity r " +
//            "WHERE r.loginDTO.id = :userId " +
//            "AND r.review_id =: reviewId" )
//    Optional<ReviewEntity> findDeleteReview(@Param("user_id") String userId ,@Param("review_id")Long review_id);


}
