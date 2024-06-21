package car.repo;

import car.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car,Long> {

    @Query("select c from Car c where c.user.id =:userId")
    List<Car> getCarsByUserId(@Param("userId") String userId);


    Car findByCarId(@Param("carId") Long carId);
}
