package review.entity;

import booking.entity.BookingEntity;
import car.entity.Car;
import jakarta.persistence.*;
import login.dto.LoginDTO;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "reviews")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @Column(name = "review_write")
    private Boolean reviewWrite;

    @Column(name = "rating")
    private Integer rating;
    //private Float rating = 0.0f; // 기본값을 0.0f로 설정

    @Column(name = "title")
    private String title;

    @Column(name = "comment")
    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private LoginDTO loginDTO;

    @OneToOne(cascade = CascadeType.ALL)//fetch = FetchType.LAZY,
    @JoinColumn(name = "booking_id")
    private BookingEntity bookingEntity;

    @ManyToOne//(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private Car car;

    /**
     * 이미지 세팅하기
     */

    public ReviewEntity(String title, String comment, LoginDTO loginDTO, Car car, BookingEntity bookingEntity) {
        this.title = title;
        this.comment = comment;
        this.loginDTO = loginDTO;
        this.car = car;
        this.bookingEntity = bookingEntity;
    }

    public void updateReview(String title, String comment) {
        this.title = title;
        this.comment = comment;
    }

    public static List<String> setCarImage(BookingEntity booking) {
        List<String> images = new ArrayList<>();
        if (booking.getCar().getCarImages() != null) {
            if (booking.getCar().getCarImages().getMain_image() != null)
                images.add(booking.getCar().getCarImages().getMain_image());
            if (booking.getCar().getCarImages().getImage1() != null)
                images.add(booking.getCar().getCarImages().getImage1());
            if (booking.getCar().getCarImages().getImage2() != null)
                images.add(booking.getCar().getCarImages().getImage2());
            if (booking.getCar().getCarImages().getImage3() != null)
                images.add(booking.getCar().getCarImages().getImage3());
            if (booking.getCar().getCarImages().getImage4() != null)
                images.add(booking.getCar().getCarImages().getImage4());
        }
        return images;
    }

    public static CarRatingInfo calCarRatingInfo(List<ReviewEntity> carReviews) {
        // 초기화
        double sumRatings = 0;
        Map<Integer, Integer> ratingCounts = new HashMap<>();

        System.out.println("carReviews: " + carReviews); // carReviews 출력

        if (carReviews != null) { // carReviews가 null인지 확인
            for (ReviewEntity review : carReviews) {
                System.out.println("review: " + review); // 각 review 출력

                if (review.getRating() != null) { // review가 null인지 확인
                    int ratingValue = review.getRating();
                    System.out.println("ratingValue: " + ratingValue); // ratingValue 출력

                    //if (ratingValue != null) { // ratingValue가 null인지 확인
                        //float rating = ratingCounts.get(ratingValue);
                        sumRatings += ratingValue;
                        ratingCounts.put(ratingValue, (ratingCounts.get(ratingValue) == null ? 0 : ratingCounts.get(ratingValue))+1);
                    //}
                }
            }
        }

        float averageRating = (carReviews == null || carReviews.isEmpty()) ? 0 : (float) (sumRatings / carReviews.size());
        System.out.println("averageRating: " + averageRating); // averageRating 출력
        System.out.println("ratingCounts: " + ratingCounts); // ratingCounts 출력

        return CarRatingInfo.builder()
                .averageRating(averageRating)
                .ratingCounts(ratingCounts)
                .build();
    }

    // CarRatingInfo 클래스 정의
    @Data
    @AllArgsConstructor
    @Builder
    @NoArgsConstructor
    public static class CarRatingInfo {
        private Float averageRating;
        private Map<Integer, Integer> ratingCounts;
    }
}


