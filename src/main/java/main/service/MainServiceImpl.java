package main.service;

import booking.entity.BookingEntity;
import driverLicense.service.NCPObjectStorageService;
import lombok.RequiredArgsConstructor;
import main.dto.HomeDTO;
import main.repository.MainRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MainServiceImpl implements MainService {

    private final MainRepository mainRepository;
    private final NCPObjectStorageService ncpObjectStorageService;



    @Override
    public List<HomeDTO> getHomeData(HomeDTO homeDTO) {

        List<BookingEntity> bookings = mainRepository.findAllHomeList();
        List<HomeDTO> homeDTOList = new ArrayList<>();

        for (BookingEntity booking : bookings) {
            HomeDTO dto = new HomeDTO();
            dto.setBooking_id(booking.getBooking_id()); // 예약 아이디
            dto.setCarid(booking.getCar().getCarId()); // 자동차 아이디
            dto.setPrice(booking.getCar().getPrice()); // 가격

            dto.setStart_date(booking.getStart_date()); // 시작 날
            dto.setEnd_date(booking.getEnd_date()); // 종료 날
            dto.setRating(booking.getCar().getRating()); // 평점
            String days = booking.getStart_date() + " ~ " + booking.getEnd_date(); // 빌려주는 시간
            dto.setDays(days);

            // NCP 오브젝트 스토리지에서 이미지 리스트 받아오기
            List<String> carImages = new ArrayList<>();
            try {
                carImages = ncpObjectStorageService.getCarImages(booking.getCarImages().getMain_image());
                if (carImages.isEmpty()) {
                    System.out.println("이미지 음성 ~!.");
                } else {
                    for (String imageUrl : carImages) {
                        System.out.println("Image URL: " + imageUrl);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
            dto.setLocationImages(carImages); // 이미지 리스트 설정
            homeDTOList.add(dto);
        }
        return homeDTOList;
    }

}
