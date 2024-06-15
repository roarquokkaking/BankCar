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
    @Query("SELECT cs.car FROM ServiceCar cs " +
           "WHERE cs.startDate <= :endDate AND cs.endDate >= :startDate " +
           "AND cs.startTime <= :endTime AND cs.endTime >= :startTime")
    List<Long> findCarIdsByServiceDatesAndTimes(
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate,
        @Param("startTime") LocalTime startTime,
        @Param("endTime") LocalTime endTime
        );
}