package main.repository;

import booking.entity.BookingEntity;
import login.dto.LoginDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MainRepository extends JpaRepository<BookingEntity,Long> {
    @Query("select e from BookingEntity as e " +
            "where e.booking_status = booking.contoller.BookingStatus.BEFORE " +
            "or e.booking_status = booking.contoller.BookingStatus.AFTER")
    List<BookingEntity> findAllHomeList();
}
