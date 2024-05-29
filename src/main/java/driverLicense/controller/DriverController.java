package driverLicense.controller;


import driverLicense.entity.DriverEntity;
import driverLicense.service.DriverService;
import driverLicense.service.NCPObjectStorageService;
import driverLicense.service.ObjectStorageService;
import jakarta.servlet.http.HttpSession;
import login.dto.LoginDTO;
import login.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin    // 다른 포트에서 넘오는 것을 받을 수 있다.
@RestController
@RequestMapping(path = "driver")
public class DriverController {

    @Autowired
    DriverService driverService;
    @Autowired
    LoginService loginService;
    ObjectStorageService objectStorageService = new NCPObjectStorageService();
    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping(path = "upload")
    public Map<String, Object> upload(@RequestPart("img") MultipartFile img, HttpSession session){
        LoginDTO loginDTO = (LoginDTO) session.getAttribute("loginDTO");

        String imageName = objectStorageService.uploadFile( "driverOCR/", img);


        String url = "https://a38f9drxdz.apigw.ntruss.com/custom/v1/31239/4ca06b2dc1422e572696ca3ed40326f7697fc20c038f7a227be0ef9f388404e0/infer";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("X-OCR-SECRET", "Vnl4YWJGTkxNV0NZckdKdUV0VHdoQVdiQkVwSE9ha0U=");

        Map<String, Object> jsonBody = new HashMap<>();
        jsonBody.put("lang", "ko");
        jsonBody.put("requestId", "string");
        jsonBody.put("resultType", "string");
        jsonBody.put("timestamp", System.currentTimeMillis());
        jsonBody.put("version", "V1");

        Map<String, Object> image = new HashMap<>();
        image.put("format", "png");
        image.put("name", "medium");
        image.put("data", null);
        image.put("url", "https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/driverOCR/" + imageName);

        jsonBody.put("images", List.of(image));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(jsonBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        Map<String, Object> returnValue = new HashMap<>();
        returnValue.put("response",response.getBody());
        returnValue.put("imageName",imageName);
        return returnValue;
    }

    @PostMapping(path = "set")
    public void set(@RequestBody DriverEntity driverEntity ){
        driverService.write(driverEntity);
        loginService.driverUpdate(driverEntity.getId(),true);
        System.out.println("면허등룍완료");
    }

}
