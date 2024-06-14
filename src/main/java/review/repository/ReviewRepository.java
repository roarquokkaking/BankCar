package review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import review.entity.ReviewEntity;

@Transactional
@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {



}
