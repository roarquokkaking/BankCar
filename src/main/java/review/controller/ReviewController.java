package review.controller;

import driverLicense.service.NCPObjectStorageService;
import driverLicense.service.ObjectStorageService;
import login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import review.dto.DetailDTO;
import review.service.ReviewService;
import java.util.*;

@RestController
@RequestMapping(path = "/review")
@CrossOrigin
@RequiredArgsConstructor

public class ReviewController {

    private final ReviewService reviewService;

    ObjectStorageService objectStorageService = new NCPObjectStorageService();


        @GetMapping(path="/getReviewBase/{user_id}")
        public List<DetailDTO> getReviews(@PathVariable(value = "user_id") String user_id
                                            ,@ModelAttribute DetailDTO detailDTO ) {
            System.out.println(user_id);
            return  reviewService.getReviews(user_id);
    }

//    @PostMapping(path = )










//    /**
//     * review list
//     * */
//    @PostMapping(path="writeReview/{user_id}/{car_id}")
//    public List<ReviewEntity>writeReview(@ModelAttribute ReviewDTO reviewDTO,
//                                         @PathVariable String user_id,
//                                         @PathVariable String car_id
////                                         @Validated String user_id,
////                                         @RequestPart("img") MultipartFile img
//    ){
////        String imageName = objectStorageService.uploadFile( "profile/", img);
//        ReviewEntity reviewEntity = reviewService.writeReview(reviewDTO, user_id);
//        return Arrays.asList(reviewEntity);
//    }
//    /**
//     * 리뷰 서비스 기능
//     * */
//    @GetMapping(path = "/averageRating")
//    public double getAverageRating() {
//        return reviewService.getAverageRating();
//    }
//
//    @GetMapping(path = "/scoreCounts")
//    public Map<Integer, Integer> getScoreCounts() {`
//        return reviewService.getScoreCounts();
//    }
//
//    @PostMapping("/saveRating")
//    public ResponseEntity<ReviewEntity> saveRating(@RequestParam int rating ,
//                                                   @ModelAttribute ReviewDTO reviewDTO) {
////        ReviewDTO reviewDTO = new ReviewDTO();
//
////        if (reviewDTO.getRating() == null) {
////            return ResponseEntity.badRequest().build();
////        }
//
//        ReviewEntity reviewEntity = reviewService.saveRating(rating,reviewDTO);
//        return new ResponseEntity<>(reviewEntity, HttpStatus.CREATED);
//    }
//
//    /**
//     * review service(get)
//     * 아이디를 이용한 user_id 리뷰 페이지 받아오기
//     * .
//     */
//

//
//
//    /**
//     * review update service
//     */
//
//    @PutMapping(path = "updateReview/{user_id}/{review_id}")
//    public ReviewDTO UpdateReivewService (@ModelAttribute ReviewDTO reviewDTO ,
//                                          @PathVariable String user_id , @PathVariable Long review_id){
//
//        ReviewEntity review   = reviewService.updateReview(user_id, review_id);
//        if(review == null) {
//            throw new NoSuchElementException("리뷰를 찾지 못했습니다.  ");
//        }else{
//            reviewService.getUpdateSerivce(reviewDTO);
//        }
//        return reviewDTO;
//    }
//
///**
// * review delete
// * */
//    @DeleteMapping(path = "/delete/{user_id}/{review_id}")
//    public ResponseEntity<Void> deleteReview(@PathVariable("user_id")  String user_id,
//                                             @PathVariable("review_id")  Long review_id) {
//        Optional<ReviewEntity> reviewEntity = reviewService.findDeleteReview(user_id, review_id);
//        if (reviewEntity.isEmpty()) {
//            throw new NoSuchElementException("리뷰없어~!");
//        } else {
//            reviewService.deleteReview(user_id, review_id);
//        }
//        return ResponseEntity.noContent().build();
//    }
//
////    /**
////     * review list
////     * */
////    @GetMapping("/review/Average/{user_id}")
////    public double reviewAverage (@Valid String user_id,
////                                          @ModelAttribute ReviewDTO reviewDTO){
////        return reviewService.getAverageRating();
////    }


}
//
//    @GetMapping(path = "/scoreCounts")
//    public Map<Integer, Integer> getScoreCounts() {
//        return reviewService.getScoreCounts();
//    }
//
//
//    @PostMapping("/saveRating")
//    public ResponseEntity<ReviewEntity> saveRating(@RequestParam int rating ,
//                                                   @ModelAttribute ReviewDTO reviewDTO) {
////        ReviewDTO reviewDTO = new ReviewDTO();
//
////        if (reviewDTO.getRating() == null) {
////            return ResponseEntity.badRequest().build();
////        }
//
//        ReviewEntity reviewEntity = reviewService.saveRating(rating,reviewDTO);
//        return new ResponseEntity<>(reviewEntity, HttpStatus.CREATED);
//    }
//
//    /**
//     * review service(get)
//     * 아이디를 이용한 user_id 리뷰 페이지 받아오기
//     * .
//     */
//
////    @GetMapping(path="/getreview/{user_id}")
////    public List<ReviewEntity> getReviews(@ModelAttribute LoginDTO loginDTO,
////                                         @PathVariable String user_id) {
////
////        List<ReviewEntity> reviewList = reviewService.getReviews(user_id);
////
////        for (ReviewEntity review : reviewList) {
////            try {
////                String imageName = review.get(); // 이미지 이름 필드가 있다고 가정
////
////                byte[] imageFile = S3.uploadFile(imageName);
////                review.setImage(imageFile); // 이미지 파일 필드가 있다고 가정
////            } catch (Exception e) {
////                // 에러를 로그 파일 또는 콘솔에 출력
////                System.err.println("이미지 다운로드 중 에러 발생: " + e.getMessage());
////            }
////        }
////
////    }
//
//
//    /**
//     * review update service
//     */
//
//    @PutMapping(path = "updateReview/{user_id}/{review_id}")
//    public ReviewDTO UpdateReivewService (@ModelAttribute ReviewDTO reviewDTO ,
//                                          @PathVariable String user_id , @PathVariable Long review_id){
//
//        ReviewEntity review   = reviewService.updateReview(user_id, review_id);
//        if(review == null) {
//            throw new NoSuchElementException("리뷰를 찾지 못했습니다.  ");
//        }else{
//            reviewService.getUpdateSerivce(reviewDTO);
//        }
//        return reviewDTO;
//    }
//
///**
// * review delete
// * */
//    @DeleteMapping(path = "/delete/{user_id}/{review_id}")
//    public ResponseEntity<Void> deleteReview(@PathVariable("user_id")  String user_id,
//                                             @PathVariable("review_id")  Long review_id) {
//        Optional<ReviewEntity> reviewEntity = reviewService.findDeleteReview(user_id, review_id);
//        if (reviewEntity.isEmpty()) {
//            throw new NoSuchElementException("리뷰없어~!");
//        } else {
//            reviewService.deleteReview(user_id, review_id);
//        }
//        return ResponseEntity.noContent().build();
//    }
//
////    /**
////     * review list
////     * */
////    @GetMapping("/review/Average/{user_id}")
////    public double reviewAverage (@Valid String user_id,
////                                          @ModelAttribute ReviewDTO reviewDTO){
////        return reviewService.getAverageRating();
////    }
//
//
//}
