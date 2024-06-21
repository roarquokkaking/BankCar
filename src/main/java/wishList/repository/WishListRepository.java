package wishList.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import wishList.entity.WishListEntity;

import java.util.List;
import java.util.Optional;

@Transactional
@Repository

public interface WishListRepository extends JpaRepository<WishListEntity,Long> {

//
//    @Query("SELECT w FROM WishListEntity  w WHERE w.loginDTO.id = :userId ")
//    Page<WishListEntity> findByUserId(String userId, Pageable pageable);

//    @Query("SELECT w FROM WishListEntity w WHERE w.loginDTO.id = :userId AND w.wishlistId = :id")
//    WishListEntity findByUserIdAndId(@Param("userId") String userId, @Param("id") Long id);
//
//
//    @Query("DELETE FROM WishListEntity w WHERE w.wishlistId = :wishlistId AND w.loginDTO.id = :userId")
//    void deleteByWishlistIdAndUserId(Long wishlistId, String userId);
//
//    @Query("SELECT w FROM WishListEntity w WHERE w.loginDTO.id = :userId")
//    Optional<WishListEntity> findByWishlistIdAndUserId(String userId);

    @Query("SELECT w FROM WishListEntity w " +
            "WHERE w.loginDTO.id = :userId " +
            "AND w.car.carId = :carId")
    Optional<WishListEntity> findByUserIdAndCarId(@Param("userId") String userId, @Param("carId") Long carId);

    @Query("SELECT w FROM WishListEntity w " +
            "WHERE w.loginDTO.id = :userId")
    List<WishListEntity> findAllByUserId(@Param("userId") String userId);

//    @Query("SELECT w FROM WishListEntity w " +
//            "WHERE w.loginDTO.id = :userId")
//    Page<WishListEntity> findWishListByUserId(@Param("userId") String userId, Pageable pageable);

    @Query("SELECT w FROM WishListEntity w " +
            "JOIN w.loginDTO u " +
            "WHERE u.id = :userId " +
            "AND w.wish = TRUE")
    Page<WishListEntity> findWishListByUserIdAndWishIsTrue(@Param("userId") String userId, Pageable pageable);

}
