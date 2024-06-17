package booking.contoller;

import booking.dto.BookingDTO;
import booking.entity.BookingEntity;
import booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping(path="/Booking")
public class BookingController {

    @Autowired
    private final BookingService bookingService;


    /**
     * 예약하기 .
     * */

//    @PostMapping("/insert/${user_id}")
//    public List<BookingEntity> booking


    /**
     * 예약정보 확인 서비스
     * */
    @GetMapping(path = "/before/{user_id}")
    public List<BookingEntity> bookingForm(@PathVariable("user_id")
                                               @Validated String user_id,
                                           @ModelAttribute BookingEntity bookingEntity) {
        List<BookingEntity> BookingDTO = bookingService.findAllByUserId(user_id);
        System.out.println(BookingDTO);
        System.out.println(user_id);

        return BookingDTO;
    }

    @GetMapping(path = "/after/{user_id}")
    public List<BookingEntity> userAfter (@PathVariable("user_id")@Validated String user_id){

        System.out.println(user_id);

        List<BookingEntity> BookingDTO  = bookingService.getAfter(user_id);


        return BookingDTO;
    }

    /**
     * booking detail page
     */
    @GetMapping(path = "/bookingDetail/{user_id}/{car_id}")
    public BookingDTO bookingDetail(@PathVariable("user_id") @Validated String user_id,
                                    @PathVariable("car_id") @Validated String car_id,
                                    @ModelAttribute BookingDTO bookingDTO) {
        Optional<BookingEntity> detailBooking = bookingService.findByUserIdAndCarId(user_id, car_id);

        if (!detailBooking.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "예약정보를 찾을 수 없습니다 .");
        } else {
            return bookingService.findByDetail(detailBooking.get());
        }
    }


//
//    @PostMapping(path = "/booking/memo/{user_id}/{booking_id}")
//    public ResponseEntity<String> bookingMemo(@PathVariable("user_id") @Valid String user_id,
//                                              @PathVariable("booking_id") @Valid String booking_id,
//                                              @RequestParam("memo") @Valid String memo) {
//
//        bookingService.getMemo(user_id , memo ,booking_id );
//        return ResponseEntity.ok("메모가 저장 되었 습니다.");
//    }

//
//    @PutMapping(path = "/mybookingscore/{car_id}")
//    public ResponseEntity<Objects> bookingScore()
}
