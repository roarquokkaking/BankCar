package search.service;

import car.repo.ServiceCarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Transactional
@Service
public class SearchServiceImpl implements SearchService {

   @Autowired
   private ServiceCarRepository serviceCarRepository;

   @Override
   public List<Long> searchId(LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime, int minPrice, int maxPrice) {
       // JPA를 사용하여 엔티티 검색
       return serviceCarRepository.findCarIdsByServiceDatesTimesAndPrice(startDate, endDate, startTime, endTime, minPrice, maxPrice);
   }

}
