package payment.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import payment.entity.KakaoPayEntity;

import java.util.Optional;

@Repository
public interface PaymentRepo extends JpaRepository<KakaoPayEntity,String> {
    @Query("select p from KakaoPayEntity p where p.id=:id and p.status=0")
    Optional<KakaoPayEntity> findByIdandstatus(@Param("id") String id);
}
