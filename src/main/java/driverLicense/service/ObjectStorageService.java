package driverLicense.service;

import driverLicense.entity.DriverEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ObjectStorageService {
    String uploadFile(String s, MultipartFile img);
}
