package chat.repository;

import chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {
    // 추가적인 쿼리 메서드를 정의할 수 있습니다.
}
