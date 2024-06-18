package booking.repository;

import booking.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

    @Query("SELECT b FROM BookingEntity b" +
            " WHERE b.loginDTO.id = :userId")
    List<BookingEntity> findBookingsByUserId(@Param("userId") String userId);

    @Query("SELECT b FROM BookingEntity b" +
            " WHERE b.loginDTO.id = :userId " +
            "AND b.booking_id = :bookingId")
    Optional<BookingEntity> findByIdAndCarId(@Param("userId")String userId,@Param("bookingId") String bookingId);


    /**
     * after 구하기
     * */
    @Query("SELECT b FROM BookingEntity b WHERE b.booking_id = :userId AND b.end_date >= :date")
    List<BookingEntity> getAfterLastNDays(@Param("userId") String userId, @Param("date") LocalDate date);
}
