package review.controller;

import driverLicense.service.NCPObjectStorageService;
import driverLicense.service.ObjectStorageService;
import login.dto.LoginDTO;
import login.service.LoginService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import review.dto.ReviewDTO;
import review.entity.ReviewEntity;
import review.service.ReviewService;

import java.util.Arrays;
import java.util.List;

import static com.amazonaws.regions.ServiceAbbreviations.S3;

@RequestMapping(path = "review")
@CrossOrigin
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    private final LoginService loginService;
    ObjectStorageService objectStorageService = new NCPObjectStorageService();


    /**
     * review service(get)
     * 아이디를 이용한 user_id 리뷰 페이지 받아오기
     * .
     * */
//
//    @GetMapping(path="/getreview/{user_id}")
//    public List<ReviewEntity> getReviews(@ModelAttribute LoginDTO loginDTO,
//                                         @PathVariable String user_id) {
//        // 이전 코드에 따르면, ReviewDTO는 이 메서드에서 사용되지 않고 있습니다// 또한 writeReview 메서드는 리뷰를 작성(저장)하는 것이 아니라 가져오는 것을 목적으로 합니다.
//        // ReviewService에 getReviews라는 메서드가 있다고 가정하면
//        List<ReviewEntity> reviewList = reviewService.getReviews(user_id);
//
//        for (ReviewEntity review : reviewList) {
//            try {
//                String imageName = review.get(); // 이미지 이름 필드가 있다고 가정
//
//                byte[] imageFile = S3.uploadFile(imageName);
//                review.setImage(imageFile); // 이미지 파일 필드가 있다고 가정
//            } catch (Exception e) {
//                // 에러를 로그 파일 또는 콘솔에 출력
//                System.err.println("이미지 다운로드 중 에러 발생: " + e.getMessage());
//            }
//        }
//
//    }

//    /**
//     * review write ( save )
//     * */
//    @PostMapping(path="writeReview/{car_id}")
//    public List<ReviewEntity>writeReview(@ModelAttribute ReviewDTO reviewDTO,
//                                         @Validated String user_id,
//                                         @RequestPart("img") MultipartFile img){
//
//
//        String imageName = objectStorageService.uploadFile( "profile/", img);
//        ReviewEntity reviewEntity = reviewService.writeReview(reviewDTO, user_id);
//        return Arrays.asList(reviewEntity);
//    }





}
