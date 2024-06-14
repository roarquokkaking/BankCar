package car.repo;

import car.entity.CarImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarImageRepository extends JpaRepository<CarImages, Long> {
}
