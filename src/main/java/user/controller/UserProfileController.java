package user.controller;


import driverLicense.service.NCPObjectStorageService;
import driverLicense.service.ObjectStorageService;
import jakarta.servlet.http.HttpSession;
import login.dto.LoginDTO;
import user.dto.UserProfileDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import user.service.UserProfileService;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(path = "/profile", produces = "application/json")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @Autowired
    private NCPObjectStorageService ncpObjectStorageService;

    ObjectStorageService objectStorageService = new NCPObjectStorageService();
    @Qualifier("messageSource")
    @Autowired
    private MessageSource messageSource;

    //리스트 띄우기
    /**
     * my profilew
     * 프로필 이미지 띄우기
     * */
    @GetMapping(path="/myprofile/{user_id}")
    public UserProfileDTO myProfile(@PathVariable("user_id") String user_id,
                                    @ModelAttribute UserProfileDTO userProfileDTO,
                                    HttpSession session) {
        System.out.println(user_id);
        session.getAttribute(user_id);

        LoginDTO loginDTO = userProfileService.findById(user_id)
                .orElseThrow(()
                        -> new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다."));

        // entity -> dto 변환
        userProfileDTO.setId(loginDTO.getId());
        userProfileDTO.setName(loginDTO.getName());
        userProfileDTO.setPhone_number(loginDTO.getPhone_number());
        userProfileDTO.setEmail(loginDTO.getEmail());
        userProfileDTO.setImage_file_name(loginDTO.getImage_file_name());
        userProfileDTO.setImage_original_name(loginDTO.getImage_original_name()); // 실제 파일명 설정
        userProfileDTO.setDriver(loginDTO.isDriver() ? "드라이버 있음" : "라이센서 없음");
        // 이미지 URL 생성
        String baseUrl = "https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/profile/";
        String imageName = loginDTO.getImage_file_name();
        String imageUrl = baseUrl + imageName;
        userProfileDTO.setImageUrl(imageUrl);
        System.out.println(imageName);
        return userProfileDTO;
    }

/**
 *  프로필 업데이트
 * */
    @GetMapping(path = "/myprofileUpdate/{user_id}")
    public UserProfileDTO myprofileUpdate(@PathVariable("user_id")String user_id,
                                          @ModelAttribute UserProfileDTO userProfileDTO,
                                          HttpSession session){
        System.out.println(user_id);
        session.getAttribute(user_id);

        LoginDTO loginDTO = userProfileService.findById(user_id)
                .orElseThrow(()
                        -> new ResponseStatusException(HttpStatus.NOT_FOUND, "회원을 찾을 수 없습니다."));

        // entity -> dto 변환
        userProfileDTO.setId(loginDTO.getId());
        userProfileDTO.setName(loginDTO.getName());
        userProfileDTO.setPhone_number(loginDTO.getPhone_number());
        userProfileDTO.setEmail(loginDTO.getEmail());
        userProfileDTO.setImage_file_name(loginDTO.getImage_file_name());
        userProfileDTO.setImage_original_name(loginDTO.getImage_original_name()); // 실제 파일명 설정
        userProfileDTO.setDriver(loginDTO.isDriver() ? "드라이버 있음" : "라이센서 없음");

        // 이미지 URL 생성
        String baseUrl = "https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/profile/";
        String imageName = loginDTO.getImage_file_name();
        String imageUrl = baseUrl + imageName;
        userProfileDTO.setImageUrl(imageUrl);
        System.out.println(imageName);
        return userProfileDTO;
    }


    /**
     * 프로필 업데이트
     * 유저 프로필 사진 업데이트
     */
    @PostMapping(path = "/profileUpdate/{user_id}")
    public ResponseEntity<UserProfileDTO> upload(@PathVariable String user_id,
                                                 @RequestPart("UserProfileDTO") UserProfileDTO userProfileDTO,
                                                 @RequestPart("image") MultipartFile img)  {

        // user_id로 사용자 프로필 조회
        LoginDTO user = userProfileService.getUserProfileDTOById(user_id);
        System.out.println(user);

        // 사용자 존재 여부 확인
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "회원아이디를 찾지 못했습니다.");
        }

        // 파일 업로드 처리
        String imageFileName = ncpObjectStorageService.uploadFile("profile/", img);
        String imageOriginalName = img.getOriginalFilename(); // 원본 파일 이름
        String bucketName = "bitcamp-6th-bucket-102";
        String fileUrl = "https://kr.object.ncloudstorage.com/" + bucketName + "/profile/" + imageFileName;

        // UserProfileDTO 객체에 이미지 정보 설정
        userProfileDTO.setImage_file_name(imageFileName); // 파일 이름
        userProfileDTO.setImage_original_name(imageOriginalName); // 원본 파일 이름
        userProfileDTO.setImageUrl(fileUrl); // 업로드된 파일 URL

        // LoginDTO 객체에 UserProfileDTO의 정보 반영
        user.setImage_file_name(imageFileName);
        user.setImage_original_name(imageOriginalName);
        user.setImageUrl(fileUrl);
//        user.setNickname(userProfileDTO.getNickname());
        user.setEmail(userProfileDTO.getEmail());
        // userProfileDTO의 다른 필드를 user 객체에 반영

        // 사용자 프로필 정보 저장
        userProfileService.saveUserProfileDTO(user);

        // 결과 반환
        return ResponseEntity.ok(userProfileDTO);


}


    /**
     * 정보 저장하기
     * */

    @PostMapping(path = "/updateProfile/{user_id}")
    public List <LoginDTO> updateProfile (@PathVariable String user_id,
                                          @RequestBody UserProfileDTO userProfileDTO) {

        Optional<LoginDTO> loginDTO =userProfileService.findById(user_id);
        System.out.println(user_id);

        if (loginDTO.isPresent()) {
            LoginDTO user = loginDTO.get();
            user.setName(userProfileDTO.getName());
            user.setEmail(userProfileDTO.getEmail());
            userProfileService.saveUserProfileDTO(user);
        } else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return userProfileService.findAll();
    }

}

