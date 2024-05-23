package login.dao;

import login.dto.LoginDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginDAO extends JpaRepository<LoginDTO,String> {
}
