package car.repo;

import car.entity.ServiceCar;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceCarRepository extends JpaRepository<ServiceCar, Long> {

}
