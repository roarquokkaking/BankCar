package car.repo;

import car.entity.ServiceCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.keyvalue.repository.config.QueryCreatorType;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceCarRepository extends JpaRepository<ServiceCar, Long> {

    @Query("select cs.car.price, cs.serviceId,cs.startDate,cs.endDate,cs.car.doroAddress,cs.car.rating, cs.car.carImages.main_image, cs.car.carImages.image1, cs.car.carImages.image2, cs.car.carImages.image3, cs.car.carImages.image4 from ServiceCar cs")
    List<Object[]> findAllOrderByIdDesc();
}
