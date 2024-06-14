package review.service;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import review.dto.ReviewDTO;
import review.entity.ReviewEntity;
import review.repository.ReviewRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

//
//
//    /**
//     * review save
//     * */
//    @Override
//    public ReviewEntity writeReview(ReviewDTO reviewDTO, String user_id) {
//
//
//
//
//        ReviewEntity reviewEntity = ReviewEntity.builder()
//                .user_id(user_id)
//                .title(reviewDTO.getTitle())
//                .comment(reviewDTO.getComment())
//                .car_model(reviewDTO.getCar_model())
//                .rating(reviewDTO.getRating())
//                .dateTime(LocalDateTime.now())
//                .build();
//
//        return reviewRepository.save(reviewEntity);
//    }
//

}
