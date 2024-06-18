package booking.service;

import booking.contoller.BookingStatus;
import booking.dto.BookingDTO;
import booking.dto.BookingUseDTO;
import booking.dto.UserBeforeDTO;
import booking.entity.BookingEntity;
import booking.repository.BookingRepository;
import car.entity.Car;
import car.entity.CarImages;
import car.repo.CarRepository;
import com.amazonaws.services.kms.model.NotFoundException;
import login.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;

    /**
     * 아이디만 찾아오기
     * booking 설정하기
     * 이미지 위치 저장하기 .
     */
    public List<UserBeforeDTO> findUserBookings(String userId) {
        List<BookingEntity> bookings = bookingRepository.findBookingsByUserId(userId);
        List<UserBeforeDTO> userBeforeDTOList = new ArrayList<>();

        if (bookings != null) {
            for (BookingEntity bookingEntity : bookings) {
                bookingEntity.setBookingStatus(bookingEntity);
                if (bookingEntity.getBooking_status() == BookingStatus.BEFORE) {
                    if (bookingEntity.getLoginDTO() != null
                            && bookingEntity.getCar() != null) {
                        UserBeforeDTO userBeforeDTO = UserBeforeDTO.builder()
                                .userid(bookingEntity.getLoginDTO().getId())
                                .carid(bookingEntity.getCar().getCarId())
                                .model(bookingEntity.getCar().getModel())
                                .color(bookingEntity.getCar().getColor())
                                .doro(bookingEntity.getCar().getDoroAddress())
                                .category(bookingEntity.getCar().getCategory())
                                .title(bookingEntity.getCar().getTitle())
                                .content(bookingEntity.getCar().getContent())
                                .rating(bookingEntity.getLoginDTO().getRating())
                                .startTime(bookingEntity.getStart_time())
                                .endTime(bookingEntity.getEnd_time())
                                .imageUrl(bookingEntity.getCarImages().getMain_image())
                                .build();
                        userBeforeDTOList.add(userBeforeDTO);
                    }
                }
            }
        }
        return userBeforeDTOList;
    }


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


 /*   public List<BookingEntity> findAllByUserId(String userId) {
        // 정보를 뽑아온다.
        List<BookingEntity> bookings = bookingRepository.findById(userId);

        // booking 상태를 알아온다.
        for (BookingEntity booking : bookings) {
            // 상태 호출
            booking.setBookingStatus(booking);
            // 널로 나타낸다.
            String status = Optional.ofNullable(booking.getBooking_status())
                    .map(BookingStatus::name)
                    .orElse(null);

            // 상태가 "BEFORE"일 때 처리
            if ("BEFORE".equals(status)) {
                Car car = carRepository.findById(booking.getCar().getCarId()).orElse(null);
                if (car != null) {
                    BookingDTO bookingDTO = BookingDTO.builder()
                            .carId(car.getCarId())
                            .carModel(car.getModel())
                            .rating(car.getRating())
                            .title(car.getTitle())
                            .content(car.getContent())
//                            .imageUrl(car.getImageUrl()) // 필요한 경우 추가
                            .build();

                    booking.setImage(bookingDTO.getImageUrl());
                }
            }
        }
        return bookings;
    }*/


/*
* user_id 로
* car_id 로 자동차 주인의 이름을 알아오고 그거를 출력해줘야함
*
*
* */

    /**
     * 유저에 관한 before 정보 얻어오기
     */




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
    @Override
    public void getMemo(String user_id, String memo, String booking_id) {

        Optional<BookingEntity> byIdAndCarId = bookingRepository.findByIdAndCarId(user_id, booking_id);
        if (byIdAndCarId.isPresent()){
//            byIdAndCarId.get().setMemo(memo);
//            byIdAndCarId.get().setbookingTitle(memo_title);
            bookingRepository.save(byIdAndCarId.get());
        }else {
            throw new RuntimeException("메모 저장을 실패 하였습니다. ");
        }


    }

//    @Override
//    public void getUseNowService(String userId, Long carId) {
//        // userId에 해당하는 예약 정보가 없는 경우 예외 처리
//        BookingEntity booking = (BookingEntity) bookingRepository.findByUserId(userId)
//                .orElseThrow(() -> new NotFoundException(userId + "를 찾지 못했습니다."));
//
//        // carId에 해당하는 차량 정보가 없는 경우 예외 처리
//        Car car = carRepository.findById(carId)
//                .orElseThrow(() -> new NotFoundException("차량 ID " + carId + "를 찾지 못했습니다."));
//
//        String hostName = car.getUser().getName();
//
//        // 예약 상태 설정
//        booking.setBookingStatus(booking);
//
//        // 차량 주인의 아이디를 가져옴
//
//
//        // 예약 상태가 "now"인 경우 처리
//        if (BookingStatus.NOW.equals(booking.getBooking_status())) {
//            BookingUseDTO bookingUseDTO = BookingUseDTO.builder()
//                    .booking_id(booking.getBooking_id())
////                    .status(booking.getBooking_status())
//                    .carId(car.getCarId())
//                    .period(booking.getStart_date() + " ~ " + booking.getEnd_date())
//                    .imageUrl(booking.getCarImages().getImage1())
//                    .model(car.getModel())
//                    .rating(car.getRating())
//                    .hostName(hostName)
////                    .guestName(booking.getGuestName())  //
//                    .build();
//            // 생성된 bookingUseDTO 객체를 사용할 수 있음
//            System.out.println("BookingUseDTO 생성 완료: " + bookingUseDTO);
//        } else {
//            System.out.println("현재 예약 상태가 'now'가 아닙니다.");
//        }
//    }

    /**
     * 선택일수에 대한 after 구하기
     * */
    @Override
    public List<BookingEntity> getAfterLastNDays(String userId, int i) {

        LocalDate date = LocalDate.now().minusDays(i);
        return bookingRepository.getAfterLastNDays(userId, date);

    }


//제목 , imgage

}
