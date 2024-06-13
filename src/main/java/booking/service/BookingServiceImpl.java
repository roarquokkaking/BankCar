package booking.service;

import booking.contoller.BookingStatus;
import booking.dto.BookingDTO;
import booking.entity.BookingEntity;
import booking.repository.BookingRepository;
import car.entity.Car;
import car.repo.CarRepository;
import login.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    @Autowired
    private final BookingRepository bookingRepository;
    @Autowired
    private final CarRepository carRepository;

    /**
     * 리스트를 다 안갖고 와도 된다 . (사람의 이름들이 많아진다 .) - > 참고
     */
    public List<BookingEntity> findAllByUserId(String user_id) {
        //이것만 정보를 뽑아 올수도
        List<BookingEntity> bookings = bookingRepository.findById(user_id);

        //booking상태 알아오고
        for (BookingEntity booking : bookings) {
            //상태 호출
            booking.setBookingStatus(booking);
            //널로 나타내기
            String status = Optional.ofNullable(booking.getBooking_status())
                    .map(BookingStatus::name)
                    .orElse(null);

            //그거에 대한 정보를 알때 사용
            if ("BEFORE".equals(status)) {
                Car car = carRepository.findById(booking.getCar().getCarId()).orElse(null);
                if (car != null) {
                    BookingDTO bookingDTO = new BookingDTO();
                    bookingDTO.setTitle(car.getTitle());
                    bookingDTO.setContent(car.getContent());
                    bookingDTO.setCarId(car.getCarId());
                    String period = booking.getStart_date() + "~" + booking.getEnd_date();
                    bookingDTO.setPeriod(period);
                    booking.setImage(bookingDTO.getImageUrl());
                }
            }
        }
        return bookings;
    }



    /**
     * 유저에 관한 before 정보 얻어오기
     */

    @Override
    public List<BookingEntity> getAfter(String user_id) {

        List<BookingEntity> bookings = bookingRepository.findById(user_id);
        for (BookingEntity booking : bookings) {
            //상태 호출
            booking.setBookingStatus(booking);

            String status = Optional.ofNullable(booking.getBooking_status())
                    .map(BookingStatus::name)
                    .orElse(null);
            if ("after".equals(status)) {
                Car car = carRepository.findById(booking.getCar().getCarId()).orElse(null);
                if (car != null) {

                    BookingDTO bookingDTO = new BookingDTO();
                    //CarEntity -> 에서 갖고 오는 정보
                    bookingDTO.setTitle(car.getTitle());
                    bookingDTO.setContent(car.getContent());
                    //시간
                    String period = booking.getStart_date() + "~" + booking.getEnd_date();

                    bookingDTO.setPeriod(period);
                    //이미지
                    booking.setImage(bookingDTO.getImageUrl());
                }
            }
        }
        return bookings;
    }

    @Override
    public Optional<BookingEntity> findByUserIdAndCarId(String user_id, String car_id) {

        return bookingRepository.findByUserIdAndCarId(user_id, car_id);

    }

    /**
     * 상세 페이지
     * */

    public BookingDTO findByDetail(BookingEntity bookingEntity) {
        String period = bookingEntity.getStart_date() + " ~ " + bookingEntity.getEnd_date();

        BookingDTO bookingDTO = new BookingDTO();
        Car car = new Car();
        LoginDTO loginDTO = new LoginDTO();

        bookingDTO.setTitle(bookingEntity.getCar().getTitle());
        bookingDTO.setContent(bookingEntity.getCar().getContent());
        bookingDTO.setPeriod(period);

        bookingDTO.setCarId(bookingEntity.getCar().getCarId());
        bookingDTO.setCarModel(bookingEntity.getCar().getModel());
//        bookingDTO.setImageUrl(bookingEntity.get);
        bookingDTO.setRating(loginDTO.getRating());


        // 추가적인 필드 설정이 필요하다면 여기에 추가합니다.
//         bookingDTO.setImage(bookingEntity.getImageUrl());

        return bookingDTO;
    }


    /**
     * 메모 저장하기
     * */
//    @Override
//    public void getMemo(String user_id, String memo, String booking_id) {
//
//        Optional<BookingEntity> byIdAndCarId = bookingRepository.findByIdAndCarId(user_id, booking_id);
//        if (byIdAndCarId.isPresent()){
////            byIdAndCarId.get().setMemo(memo);
////            byIdAndCarId.get().setbookingTitle(memo_title);
//            bookingRepository.save(byIdAndCarId.get());
//        }else {
//            throw new RuntimeException("메모 저장을 실패 하였습니다. ");
//        }
//
//
//    }

//제목 , imgage

}
