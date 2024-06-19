package car.repo;

import car.entity.ServiceCar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.keyvalue.repository.config.QueryCreatorType;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceCarRepository extends JpaRepository<ServiceCar, Long> {

}
