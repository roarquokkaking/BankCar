package search.repo;

import car.entity.ServiceCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface SearchRepoService extends JpaRepository<ServiceCar, Long> {
    @Query("SELECT cs.car.carId FROM ServiceCar cs " +
            "WHERE cs.startDate <= :endDate AND cs.endDate >= :startDate " +
            "AND cs.startTime <= :endTime AND cs.endTime >= :startTime " +
            "AND cs.car.price <= :maxPrice AND cs.car.price >= :minPrice")
    List<Long> findCarIdsByServiceDatesAndTimesPrices(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("startTime") LocalTime startTime,
            @Param("endTime") LocalTime endTime,
            @Param("minPrice") int minPrice,
            @Param("maxPrice") int maxPrice);
}