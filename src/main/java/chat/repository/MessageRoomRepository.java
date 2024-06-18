package chat.repository;

import chat.entity.MessageRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRoomRepository extends JpaRepository<MessageRoom, Long> {

    // 호스트 이름 또는 게스트 이름으로 채팅 방 목록 조회
    List<MessageRoom> findByHostNameOrGuestName(String hostName, String guestName);

    // roomSeq로 채팅 방 조

    Optional<MessageRoom> findByRoomSeq(Long roomseq); // 메서드 추가

    // 필요한 경우 추가적인 쿼리 메소드 정의 가능
}
