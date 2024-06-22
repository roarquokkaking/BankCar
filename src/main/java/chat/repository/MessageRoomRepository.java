package chat.repository;

import chat.entity.MessageRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRoomRepository extends JpaRepository<MessageRoom, Long> {

    // 호스트 이름 또는 게스트 이름으로 채팅 방 목록 조회
    List<MessageRoom> findByHostNameOrGuestName(String hostName, String guestName);

    // roomSeq로 채팅 방 조

    Optional<MessageRoom> findByRoomSeq(Long roomseq); // 메서드 추가

    @Query("SELECT mr FROM MessageRoom mr LEFT JOIN FETCH mr.lastMessage")
    List<MessageRoom> findAllWithLastMessage();

//    // MessageRoom 엔티티와 User 엔티티의 조인을 통해 필요한 데이터 조회
//    @Query("SELECT mr FROM MessageRoom mr " +
//            "JOIN FETCH mr.host h " +
//            "JOIN FETCH mr.guest g " +
//            "WHERE h.username = :username OR g.username = :username")
//    List<MessageRoom> findMessageRoomsByUsername(@Param("username") String username);
}
