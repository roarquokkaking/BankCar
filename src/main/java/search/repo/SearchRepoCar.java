package search.repo;

import car.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchRepoCar extends JpaRepository<Car,Long> {
    @Query("SELECT cs.carId FROM Car cs " +
       "WHERE cs.price <= :maxPrice AND cs.price >= :minPrice " +
       "AND cs.carId IN (:carIds)")
    List<Long> findCarIdsByPrice(@Param("minPrice") int minPrice,
                                 @Param("maxPrice") int maxPrice,
                                 @Param("carIds") List<Long> carIds);
}
