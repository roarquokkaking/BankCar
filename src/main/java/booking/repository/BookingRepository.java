package booking.repository;

import booking.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface BookingRepository extends JpaRepository<BookingEntity,Long> {



    @Query("SELECT b FROM BookingEntity b " +
            "JOIN b.loginDTO u " +
//            "JOIN b.car c " +
            "WHERE u.id = :user_id")
    List<BookingEntity> findById(@Param("user_id") String user_id);

    @Query("SELECT b FROM BookingEntity b" +
            " JOIN b.loginDTO u" +
            " WHERE u.id = :user_id AND b.car = :car_id")
    Optional<BookingEntity> findByUserIdAndCarId(@Param("user_id") String userId, @Param("car_id") String carId);


}
