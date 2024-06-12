package payment.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import payment.entity.KakaoPayEntity;

@Repository
public interface PaymentRepo extends JpaRepository<KakaoPayEntity,String> {
}
