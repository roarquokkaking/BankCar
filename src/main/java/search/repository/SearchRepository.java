package search.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import search.bean.SearchDTO;

import java.util.*;
import java.sql.Time;
@Repository
public interface SearchRepository extends JpaRepository<SearchDTO, Long>{

       @Query("SELECT cs.car FROM CarServiceEntity cs " +
       "WHERE cs.startDate <= :endDate AND cs.endDate >= :startDate " +
       "AND cs.startTime <= :endTime AND cs.endTime >= :startTime " +
       "AND cs.car.price >= :minPrice AND cs.car.price <= :maxPrice")
    Optional<SearchDTO> findCarByServiceDatesAndTimesAndPriceRange(
            Date startDate, Date endDate, Time startTime, Time endTime,
            Integer minPrice, Integer maxPrice);
}
