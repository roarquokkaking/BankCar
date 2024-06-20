package booking.service;

import booking.dto.BookingDTO;
import booking.dto.UserBeforeDTO;
import booking.entity.BookingEntity;

import java.util.List;
import java.util.Optional;

public interface BookingService {

//    List<BookingEntity> findAllByUserId(String user_id);

    List<BookingDTO> getAfter(String user_id, Integer days);


    Optional<BookingEntity> findByUserIdAndCarId(String userId, String carId);

    BookingDTO findByDetail(BookingEntity bookingEntity);



    List<UserBeforeDTO> findUserBookings(String userId);

    void getMemo(String userId, String memo, String bookingId);

    List<BookingDTO> getBookings(String userId, String period);


    //after 에 관한 서비스 
//    List<BookingDTO> getAllBookings(String userId);
//
//    List<BookingDTO> getBookingsByPeriod(String userId, int days);


//    void getUseNowService(String userId , Long carId);
}
