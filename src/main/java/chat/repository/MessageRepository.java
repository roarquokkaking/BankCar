package chat.repository;

import chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByMessageRoom_RoomSeq(Long roomSeq);

    Optional<Message> findTopByMessageRoomRoomSeqOrderBySentTimeDesc(Long roomSeq);
    // 추가적인 쿼리 메서드를 정의할 수 있습니다.
}
