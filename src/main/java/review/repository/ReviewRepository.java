package review.repository;

import login.dao.LoginDAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import review.entity.ReviewEntity;

import java.util.List;
import java.util.Optional;

@Transactional
@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {


        @Query("SELECT r FROM ReviewEntity r " +
                "JOIN FETCH r.bookingEntity b " +
                "JOIN FETCH b.car c " +
                "LEFT JOIN FETCH c.carImages " +
                "WHERE r.loginDTO.id = :userId")
        List<ReviewEntity> findReviewsByUserId(@Param("userId") String userId);


        @Query("SELECT r FROM ReviewEntity r WHERE r.car.carId = :carId")
        List<ReviewEntity> findReviewsByCarId(@Param("carId") Long carId);



        @Query("SELECT r FROM ReviewEntity r" +
                " JOIN r.bookingEntity b " +
                "JOIN b.loginDTO u " +
                "JOIN b.car c" +
                " WHERE u.id = :userId " +
                "AND c.carId = :carId")
        List<ReviewEntity> findReviewByUserIdAndCarId(@Param("userId") String userId, @Param("carId") Long carId);



        List<ReviewEntity> findByCar_CarId(Long carId);



        @Query("select r from ReviewEntity r " +
                "join r.loginDTO u " +
                "join r.car c " +
                "where u.id = :userId and c.carId = :carId")
        List<ReviewEntity> findByUserIdAndCarId(@Param("userId") String userId, @Param("carId") Long carId);


        /*리뷰 사용하기 */
        @Query("SELECT r FROM ReviewEntity r" +
                " WHERE r.loginDTO.id = :userId " +
                "AND r.car.carId = :carId " )
        ReviewEntity findReview(@Param("userId") String userId, @Param("carId") Long carId);


        @Query("SELECT r FROM ReviewEntity r WHERE r.car.carId = :carId")
        List<ReviewEntity> findByCarId(@Param("carId") Long carId);}
