package driverLicense.controller;


import driverLicense.entity.DriverEntity;
import driverLicense.service.NCPObjectStorageService;
import driverLicense.service.ObjectStorageService;
import jakarta.servlet.http.HttpSession;
import login.dto.LoginDTO;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin    // 다른 포트에서 넘오는 것을 받을 수 있다.
@RestController
@RequestMapping(path = "driver")
public class DriverController {

    ObjectStorageService objectStorageService = new NCPObjectStorageService();


    @PostMapping(path = "upload")
    public String upload(@RequestPart("img") MultipartFile img, HttpSession session){
        LoginDTO loginDTO = (LoginDTO) session.getAttribute("loginDTO");

        String imageName = objectStorageService.uploadFile( "driverOCR/", img);

        return imageName;
    }

}
