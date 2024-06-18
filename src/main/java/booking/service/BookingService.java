package booking.service;

import booking.dto.BookingDTO;
import booking.dto.UserBeforeDTO;
import booking.entity.BookingEntity;

import java.util.List;
import java.util.Optional;

public interface BookingService {

//    List<BookingEntity> findAllByUserId(String user_id);

    List<BookingEntity> getAfter(String user_id);


    Optional<BookingEntity> findByUserIdAndCarId(String userId, String carId);

    BookingDTO findByDetail(BookingEntity bookingEntity);



    List<UserBeforeDTO> findUserBookings(String userId);

    void getMemo(String userId, String memo, String bookingId);


//    void getUseNowService(String userId , Long carId);

    List<BookingEntity> getAfterLastNDays(String userId, int i);
}
