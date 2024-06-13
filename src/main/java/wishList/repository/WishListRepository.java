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

import java.util.Optional;

@Transactional
@Repository

public interface WishListRepository extends JpaRepository<WishListEntity,Long> {


    @Query("SELECT w FROM WishListEntity  w WHERE w.loginDTO.id = :userId ")
    Page<WishListEntity> findByUserId(String userId, Pageable pageable);

    @Query("SELECT w FROM WishListEntity w WHERE w.loginDTO.id = :userId AND w.wishlistId = :id")
    WishListEntity findByUserIdAndId(@Param("userId") String userId, @Param("id") long id);

    @Modifying
    @Query("DELETE FROM WishListEntity w WHERE w.wishlistId = :wishlistId AND w.loginDTO.id = :userId")
    void deleteByWishlistIdAndUserId(Long wishlistId, String userId);

    @Modifying
    @Query("SELECT w FROM WishListEntity w WHERE w.wishlistId = :wishlistId AND w.loginDTO.id = :userId")
    Optional<WishListEntity> findByWishlistIdAndUserId(String userId, Long wishlistId);


}
