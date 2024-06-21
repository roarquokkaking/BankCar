package booking.service;

import booking.contoller.BookingStatus;
import booking.dto.BookingDTO;
import booking.dto.UserBeforeDTO;
import booking.entity.BookingEntity;
import booking.repository.BookingRepository;
import car.entity.Car;
import car.repo.CarRepository;
import login.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import review.entity.ReviewEntity;

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
                                .rating(bookingEntity.getCar().getRating())
                                .startTime(bookingEntity.getStart_time())
                                .endTime(bookingEntity.getEnd_time())
                                .pay(bookingEntity.getCar().getPrice())
                                //host name
                                //user
//                                .imageUrl(bookingEntity.getCar().getCarImages().getMain_image())
                                .build();
                        userBeforeDTOList.add(userBeforeDTO);
                    }
                }
            }
        }
        return userBeforeDTOList;
    }

    @Override
    public List<BookingDTO> getAfter(String userId, Integer days) {
        LocalDate currentDate = LocalDate.now();
        LocalDate targetDate = (days != null) ? currentDate.minusDays(days) : currentDate;
        System.out.println(222222);
        List<BookingEntity> bookings = bookingRepository.getAfterLastNDays(userId, targetDate);
        List<BookingDTO> bookingDTOs = new ArrayList<>();

        for (BookingEntity booking : bookings) {

            booking.setBookingStatus(booking);

            if (booking. getBooking_status() == BookingStatus.AFTER) {
                Car car = carRepository.findById(booking.getCar().getCarId()).orElse(null);
                if (car != null) {
                    String period = booking.getStart_date() + "~" + booking.getEnd_date();
                    BookingDTO bookingDTO = BookingDTO.builder()
                            .carId(car.getCarId())
//                            .reviewId
                            .title(car.getTitle())
                            .content(car.getContent())
//                            .imageUrl(car.getCarImages().getMain_image())
                            .period(period)
                            .build();
                    // 이미지 설정
                    // booking.setImage(bookingDTO.getImageUrl()); // 필요 시 BookingEntity에 이미지 설정
                    bookingDTOs.add(bookingDTO);
                }
            }
        }
        return bookingDTOs;
    }


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

    @Override
    public List<BookingDTO> getBookings(String userId, String period) {
        return List.of();
    }

    @Override
    public void setBooking(BookingEntity booking) {
        bookingRepository.save(booking);
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


}
