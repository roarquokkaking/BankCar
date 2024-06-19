package car.repo;

import car.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car,Long> {
    List<Car> findByUserId(String userId);

    @Query("select c,cs from Car c inner join ServiceCar cs on cs.car.carId=c.carId order by c.carId DESC")
    List<Object[]> findAllOrderByIdDesc();

    Car findByCarId(Long carId);
}
