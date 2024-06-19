//package review.entity;
//
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import lombok.*;
//import review.dto.ReviewDTO;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Getter
//@Setter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class ReviewEntity {
//
//    @Id
//    @GeneratedValue
//    private Long review_id;
//
//    private Long car_id;
//
//    private String user_id;
//
//    @Column(name = "rating")
//    private int rating;
//
//    @Column(name = "title")
//    private String title;
//
//    @Column(name = "car_model")
//    private String car_model;
//
//    @Column(name = "comment")
//    private String comment;
//
//    @Column(name = "dateTime ")
//    private LocalDateTime dateTime;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "car_id")
//    private Car car;
//}
