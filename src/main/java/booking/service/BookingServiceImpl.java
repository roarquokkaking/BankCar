package booking.service;

import booking.contoller.BookingStatus;
import booking.dto.BookingDTO;
import booking.dto.UserBeforeDTO;
import booking.entity.BookingEntity;
import booking.repository.BookingRepository;
import car.entity.Car;
import car.repo.CarRepository;
import notification.entity.Notification;
import notification.service.NotificationStorageService;
import login.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
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
    private final NotificationStorageService notificationStorageService;

    /**
     * 아이디만 찾아오기
     * booking 설정하기
     * 이미지 위치 저장하기 .
     */
    public List<UserBeforeDTO> findUserBookings(String userId) {
        System.out.println("findUserBookings 메서드 호출됨: userId = " + userId);

        List<BookingEntity> bookings = null;
        try {
            bookings = bookingRepository.findBookingsByUserId(userId);
            System.out.println("bookings 조회 결과: " + bookings);
        } catch (Exception e) {
            System.err.println("bookings 조회 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
        }

        List<UserBeforeDTO> userBeforeDTOList = new ArrayList<>();

        if (bookings != null && !bookings.isEmpty()) {
            System.out.println("bookings가 null이 아님");
            for (BookingEntity bookingEntity : bookings) {
                System.out.println("BookingEntity 상태: " + bookingEntity.getBooking_status());
                System.out.println(123);
                try {
                    if (bookingEntity.getBooking_status() == BookingStatus.BEFORE) {
                        System.out.println("dir;salwlsdu");
                        if (bookingEntity.getLoginDTO() != null && bookingEntity.getCar() != null) {
                            System.out.println("LoginDTO와 Car 정보가 모두 존재함");
                            System.out.println("dir;salwlsdu");
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
                                    .endDate(bookingEntity.getEnd_date())
                                    .startDate(bookingEntity.getStart_date())
                                    .startTime(bookingEntity.getStart_time())
                                    .endTime(bookingEntity.getEnd_time())
                                    .pay(bookingEntity.getCar().getPrice())
                                    .imageUrl(bookingEntity.getCar().getCarImages().getMain_image())
                                    .build();
                            userBeforeDTOList.add(userBeforeDTO);
                            System.out.println("UserBeforeDTO 생성됨: " + userBeforeDTO);
                        } else {
                            System.out.println("LoginDTO 또는 Car 정보가 존재하지 않음");
                        }
                    }
                } catch (Exception e) {
                    System.err.println("BookingEntity 처리 중 오류 발생: " + e.getMessage());
                    e.printStackTrace();
                }
            }
        } else {
            System.out.println("bookings가 null이거나 빈 리스트임");
        }

        System.out.println("최종 userBeforeDTOList: " + userBeforeDTOList);
        return userBeforeDTOList;
    }


    @Override
    public List<BookingDTO> getAfter(String userId, Integer days) {
        LocalDate currentDate = LocalDate.now();
        LocalDate targetDate = (days != null) ? currentDate.minusDays(days) : currentDate;
        System.out.println(222222);
        List<BookingEntity> bookings = bookingRepository.getAfterLastNDays(userId, targetDate);
        System.out.println(bookings);
        List<BookingDTO> bookingDTOs = new ArrayList<>();

        for (BookingEntity booking : bookings) {

            booking.setBookingStatus(booking);

            System.out.println(booking.getCar().getCarId());

            if (booking.getBooking_status() == BookingStatus.AFTER) {

                Car car = carRepository.findById(booking.getCar().getCarId()).orElse(null);

                System.out.println(car);
                if (car != null) {
                    String period = booking.getStart_date() + "~" + booking.getEnd_date();
                    BookingDTO bookingDTO = BookingDTO.builder()
                            .carId(car.getCarId())
                            .userId(booking.getLoginDTO().getId())
                            .booking_id(booking.getBooking_id())
//                           .reviewId
                            .title(car.getTitle())
                            .content(car.getContent())
                            .imageUrl(car.getCarImages().getMain_image() != null ? car.getCarImages().getMain_image() : null)
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
    public Optional<BookingEntity> findByUserIdAndCarId(String user_id, Long car_id) {

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
        // bookingDTO.setImage(bookingEntity.getImageUrl());

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

        // 예약 완료시 알림 보내기
        notificationStorageService.createNotificationStorage(Notification.builder()
                .delivered(false)
                .content(booking.getGuest_name() + "님이 귀하의 차량을 예약하셨습니다.")
                .userFrom(booking.getLoginDTO())
                .userTo(booking.getCar().getUser()).build());

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
