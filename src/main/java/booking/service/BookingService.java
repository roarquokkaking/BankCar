package booking.service;

import booking.dto.BookingDTO;
import booking.entity.BookingEntity;

import java.util.List;
import java.util.Optional;

public interface BookingService {

    List<BookingEntity> findAllByUserId(String user_id);

    List<BookingEntity> getAfter(String user_id);


    Optional<BookingEntity> findByUserIdAndCarId(String userId, String carId);

    BookingDTO findByDetail(BookingEntity bookingEntity);


//    void getMemo(String user_id, String memo, String booking_id);
}
