package chat.repository;

import java.util.List;
import java.util.Optional;
import chat.bean.JoinUser;
import chat.bean.MessageRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JoinUserRepository extends JpaRepository<JoinUser, String> {
    Optional<JoinUser> findByMessageRoom_RoomIdAndLoginDTO_Id(String roomId, String loginId);

    List<JoinUser> findByid(String id);
}