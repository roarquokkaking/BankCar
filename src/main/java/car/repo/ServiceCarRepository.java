package car.repo;

import car.entity.ServiceCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface ServiceCarRepository extends JpaRepository<ServiceCar, Long> {

    @Query("select cs.car.price, cs.car.carId,cs.startDate,cs.endDate,cs.car.doroAddress,cs.car.rating, cs.car.carImages.main_image, cs.car.carImages.image1, cs.car.carImages.image2, cs.car.carImages.image3, cs.car.wish from ServiceCar cs where cs.car.category=:label order by cs.startDate DESC")
    List<Object[]> findAllOrderByIdDesc(@Param("label") String label);

    @Query("select cs.car.price, cs.car.carId,cs.startDate,cs.endDate,cs.car.doroAddress,cs.car.rating, cs.car.carImages.main_image, cs.car.carImages.image1, cs.car.carImages.image2, cs.car.carImages.image3, cs.car.wish from ServiceCar cs order by cs.startDate DESC")
    List<Object[]> findAllOrderByIdDesc();

    @Query(value = "SELECT sc.car.carId FROM ServiceCar sc WHERE " +
            "((sc.startDate < :startDate AND sc.endDate > :endDate AND sc.car.price >= :minPrice AND sc.car.price <= :maxPrice) OR " +
            "(sc.startDate = :startDate AND sc.startTime <= :startTime AND sc.endDate = :endDate AND sc.endTime >= :endTime AND " +
            "sc.car.price >= :minPrice AND sc.car.price <= :maxPrice)) AND " +
            "(6371 * acos(cos(radians(:latitude)) * cos(radians(CAST(sc.car.latitude AS double))) * " +
            "cos(radians(CAST(sc.car.longitude AS double)) - radians(:longitude)) + " +
            "sin(radians(:latitude)) * sin(radians(CAST(sc.car.latitude AS double))))) <= 5")
    List<Long> findCarIdsByServiceDatesTimesAndPrice(@Param("startDate") LocalDate startDate,
                                                     @Param("endDate") LocalDate endDate,
                                                     @Param("startTime") LocalTime startTime,
                                                     @Param("endTime") LocalTime endTime,
                                                     @Param("minPrice") int minPrice,
                                                     @Param("maxPrice") int maxPrice,
                                                     @Param("latitude") double latitude,
                                                     @Param("longitude") double longitude);

        @Query(value = "select cs.car.price, cs.car.carId,cs.startDate,cs.endDate,cs.car.doroAddress,cs.car.rating, cs.car.carImages.main_image, cs.car.carImages.image1, cs.car.carImages.image2, cs.car.carImages.image3, cs.car.wish "+
                "from ServiceCar cs where (6371 * acos(cos(radians(:latitude)) * cos(radians(CAST(cs.car.latitude AS double))) * " +
                "cos(radians(CAST(cs.car.longitude AS double)) - radians(:longitude)) + "  +
                "sin(radians(:latitude)) * sin(radians(CAST(cs.car.latitude AS double))))) <= 5 order by cs.startDate DESC")
        List<Object[]> findAllOrderByLatitudeLongitudeAndIdDesc(@Param("latitude") double latitude, @Param("longitude") double longitude);
}
