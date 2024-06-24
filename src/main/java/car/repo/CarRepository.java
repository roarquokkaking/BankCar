package car.repo;

import car.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car,Long> {

    @Query("select c from Car c where c.user.id =:userId")
    List<Car> getCarsByUserId(@Param("userId") String userId);


    @Query(value = "SELECT c.car_id, c.id, c.car_image_id, c.title, c.content, c.latitude, c.longitude, c.doro_address, c.jibun_address, c.category, c.model, c.released, c.color, c.segment, c.price, c.created_date, c.rating, c.wish " +
            "FROM Car c " +
            "WHERE c.car_id = :carId", nativeQuery = true)
    Car findCarWithoutWishLists(@Param("carId") Long carId);


    @Modifying
    @Transactional
    @Query("delete from Car c where c.carId = :carId and c.user.id= :userId")
    void deleteCarByUserIdAndCarId(@Param("userId") String userId, @Param("carId") Long carId);
}
