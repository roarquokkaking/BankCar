package user.repository;

import login.dto.LoginDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfileDAO extends JpaRepository<LoginDTO,String> {




}
