package review.controller;

import booking.service.BookingService;
import booking.service.BookingServiceImpl;
import com.amazonaws.services.kms.model.NotFoundException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import driverLicense.service.NCPObjectStorageService;
import driverLicense.service.ObjectStorageService;
import login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import review.dto.DetailDTO;
import review.dto.ReviewDTO;
import review.entity.ReviewEntity;
import review.service.ReviewService;
import java.util.*;

@RestController
@RequestMapping(path = "/api/review", produces = "application/json")
@CrossOrigin
@RequiredArgsConstructor

public class ReviewController {

    private final ReviewService reviewService;
    private final BookingService bookingService;
    ObjectStorageService objectStorageService = new NCPObjectStorageService();


    /**
     * 정보 받아오는  메소드
     * */

    @GetMapping(path = "/getReviewBase/{booking_id}/{carId}/{userId}")
    public DetailDTO getReview(@PathVariable(value = "booking_id") Long bookingId,
                               @PathVariable(value = "carId") Long carId,
                               @PathVariable(value = "userId") String userId) {
        System.out.println("getReview 호출됨, user_id: " + bookingId + ", car_id: " + carId);

            DetailDTO detailDTO =reviewService.getReview(bookingId,userId,carId);
            return detailDTO;

    }











    /**
     * rating 저장하기
     */
    @PostMapping(path = "/saveRating")
    public ResponseEntity<ReviewEntity> saveRating(@RequestParam(value = "rating", defaultValue = "0") Integer rating,
                                                   @RequestParam(value = "user_id") String userId,
                                                   @RequestParam(value = "car_id") Long carId) {
        try {
            System.out.println("ra"+rating);
            System.out.println("us"+userId);
            System.out.println("ca"+carId);

            ReviewEntity reviewEntity = reviewService.saveRating(rating, userId, carId);
            return new ResponseEntity<>(reviewEntity, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 리뷰 저장하기
     * */

    @PostMapping("/writeReview")
    public ResponseEntity<String> writeReview(@RequestBody ReviewDTO reviewDTO) {
        System.out.println(reviewDTO.getCar_id());
        System.out.println(reviewDTO.getTitle());
        System.out.println("reviewDTO = " + reviewDTO.toString());
        reviewService.writeReview(reviewDTO);
        return new ResponseEntity<>("Review submitted successfully", HttpStatus.OK);
    }


}


