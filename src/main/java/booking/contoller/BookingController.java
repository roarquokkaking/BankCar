package booking.contoller;

import booking.dto.BookingDTO;
import booking.dto.UserBeforeDTO;
import booking.entity.BookingEntity;
import booking.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping(path="/api/Booking", produces = "application/json")
public class BookingController {

    @Autowired
    private final BookingService bookingService;


    /**
     * 예약정보 확인 서비스
     * */

    @GetMapping(path = "/before/{user_id}")
    public List<UserBeforeDTO> getBookings(@PathVariable("user_id") String user_id,
                                           @ModelAttribute UserBeforeDTO userBeforeDTO) {
        System.out.println(user_id);
        System.out.println(1111111);
        System.out.println(user_id);
        return bookingService.findUserBookings(user_id);
    }


    @GetMapping(path = "/after/{user_id}")
    public ResponseEntity<List<BookingDTO>> getBookingsAfter(
            @PathVariable("user_id") String user_id,
            @RequestParam(value = "period", required = false,defaultValue = "2000") int period) {
        System.out.println(user_id);
        List<BookingDTO> bookings = bookingService.getAfter(user_id, period);
        return ResponseEntity.ok(bookings);
    }





    /**
     * booking detail page
     */
    @GetMapping(path = "/bookingDetail/{user_id}/{car_id}")
    public BookingDTO bookingDetail(@PathVariable("user_id") @Validated String user_id,
                                    @PathVariable("car_id") @Validated Long car_id,
                                    @ModelAttribute BookingDTO bookingDTO) {
        Optional<BookingEntity> detailBooking = bookingService.findByUserIdAndCarId(user_id, car_id);

        if (!detailBooking.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "예약정보를 찾을 수 없습니다 .");
        } else {
            return bookingService.findByDetail(detailBooking.get());
        }
    }



    @PostMapping(path = "/booking/memo/{user_id}/{booking_id}")
    public ResponseEntity<String> bookingMemo(@PathVariable("user_id")  String user_id,
                                              @PathVariable("booking_id") String booking_id,
                                              @RequestParam("memo")  String memo) {

        bookingService.getMemo(user_id , memo ,booking_id );
        return ResponseEntity.ok("메모가 저장 되었 습니다.");
    }

//
//    @PutMapping(path = "/mybookingscore/{car_id}")
//    public ResponseEntity<Objects> bookingScore()



    /**
     *  현재 사용중인 자동차
     * */
//
//    @GetMapping(path = "/useNow/{user_id}/{car_id}")
//    public ResponseEntity<String> bookingNow (@ModelAttribute BookingUseDTO bookingUseDTO,
//                                              @PathVariable String user_id,
//                                              @PathVariable Long car_id){
//        bookingService.getUseNowService(user_id , car_id);
//
//        return ResponseEntity.ok("현재 사용중인 자동차입니다.");
//    }
}
