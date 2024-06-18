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

        List<ServiceCar> serviceCars = mainRepository.findAllHomeList();
        List<HomeDTO> homeDTOList = new ArrayList<>();

        for (ServiceCar servicecar : serviceCars) {

            // 이미지 리스트 받기
            List<String> carImages = new ArrayList<>();
            try {
                if (servicecar.getCarImages() != null) {
                    String mainImage = servicecar.getCarImages().getMain_image();
                    carImages = ncpObjectStorageService.getCarImages(mainImage);
                    if (carImages.isEmpty()) {
                        System.out.println("이미지 없음 ~!.");
                    } else {
                        for (String imageUrl : carImages) {
                            System.out.println("Image URL: " + imageUrl);
                        }
                    }
                } else {
                    System.out.println("CarImages 객체가 null입니다.");
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            HomeDTO dto = HomeDTO.builder()
                    .serviceCarId(servicecar.getServiceId())
                    .carid(servicecar.getCar().getCarId())

                    .price(servicecar.getCar().getPrice())
                    .startDate(servicecar.getStartDate())
                    .endDate(servicecar.getEndDate())
                    .startTime(servicecar.getStartTime())
                    .endTime(servicecar.getEndTime())
                    .rating(servicecar.getCar().getRating())

                    .days(servicecar.getStartDate() + " ~ " + servicecar.getEndDate())
                    .locationImages(carImages)
                    .build();

            homeDTOList.add(dto);
        }
        return homeDTOList;
    }


}
