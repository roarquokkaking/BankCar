package main.repository;

import booking.entity.BookingEntity;
import car.entity.ServiceCar;
import login.dto.LoginDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface MainRepository extends JpaRepository<ServiceCar,Long> {
    @Query("SELECT sc FROM ServiceCar sc " +
            "JOIN FETCH sc.car c " +
            "LEFT JOIN FETCH sc.carImages ci")
    List<ServiceCar> findAllHomeList();
}
