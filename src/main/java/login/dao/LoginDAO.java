package login.dao;

import login.dto.LoginDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginDAO extends JpaRepository<LoginDTO,String> {




    @Modifying
    @Query("update LoginDTO dto set dto.driver=:driverYN where dto.id=:id")
    void updateDriver(String id, boolean driverYN);

    @Query("SELECT l FROM LoginDTO l " +
            "WHERE l.id = :userId")
    Optional<LoginDTO> findByUserId(@Param("userId") String userId);
}
