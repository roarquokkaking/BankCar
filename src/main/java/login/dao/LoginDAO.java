package login.dao;

import login.dto.LoginDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginDAO extends JpaRepository<LoginDTO,String> {

    @Modifying
    @Query("update LoginDTO dto set dto.driver=:driverYN where dto.id=:id")
    void updateDriver(String id, boolean driverYN);


    LoginDTO findById(Long userId);
}
