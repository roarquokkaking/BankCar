package booking.contoller;

import booking.dto.BookingDTO;
import booking.dto.UserBeforeDTO;
import booking.entity.BookingEntity;
import booking.service.BookingService;
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
@RequestMapping(path="/Booking")
public class BookingController {

    @Autowired
    private final BookingService bookingService;


    /**
     * 예약정보 확인 서비스
     * */
 /*   @GetMapping(path = "/before/{user_id}")
    public List<BookingEntity> bookingForm(@PathVariable("user_id")
                                               @Validated String user_id,
                                           @ModelAttribute BookingEntity bookingEntity) {
        List<BookingEntity> BookingDTO = bookingService.findAllByUserId(user_id);
        System.out.println(BookingDTO);
        System.out.println(user_id);

        return BookingDTO;
    }*/

    @GetMapping(path = "/before/{user_id}")
    public List<UserBeforeDTO> getBookings(@PathVariable String user_id,
                                           @ModelAttribute UserBeforeDTO userBeforeDTO) {
        return bookingService.findUserBookings(user_id);
    }


//
//    @GetMapping(path = "/after/{user_id}")
//    public List<BookingEntity> userAfter (@PathVariable("user_id")@Validated String user_id){
//
//        System.out.println(user_id);
//
//        List<BookingEntity> BookingDTO  = bookingService.getAfter(user_id);
//
//
//        return BookingDTO;
//    }
//
    @GetMapping(path = "/after/{user_id}")
    public List<BookingEntity> userAfter (
            @PathVariable("user_id") @Validated String user_id,
            @RequestParam(value = "dateRange", defaultValue = "all") String dateRange) {

        System.out.println("User ID: " + user_id);
        System.out.println("Date Range: " + dateRange);

        List<BookingEntity> bookingList;
        switch (dateRange) {
            case "7":
                bookingList = bookingService.getAfterLastNDays(user_id, 7);
                break;
            case "15":
                bookingList = bookingService.getAfterLastNDays(user_id, 15);
                break;
            case "30":
                bookingList = bookingService.getAfterLastNDays(user_id, 30);
                break;
            case "all":
            default:
                bookingList = bookingService.getAfter(user_id);
                break;
        }

        return bookingList;
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
