package driverLicense.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import driverLicense.entity.DriverEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Service
public class NCPObjectStorageService implements ObjectStorageService{
    final String endPoint = "https://kr.object.ncloudstorage.com";
    final String regionName = "kr-standard";
    final String accessKey = "D7C5046C9F3754724617";
    final String secretKey = "5EBA2F798A2F9085B4719B3CA4536E17AB44ABB4";
    final String bucketName = "bitcamp-6th-bucket-102";

    // S3 client
    final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
            .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration(endPoint, regionName))
            .withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
            .build();

    @Override
    public String uploadFile(String s, MultipartFile img) {
        try(InputStream fileIn = img.getInputStream()){
            //String imageOriginalFileName = img.getOriginalFilename();
            String imageFileName = UUID.randomUUID().toString();

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(img.getContentType());

            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, s + imageFileName, fileIn, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead);

            s3.putObject(putObjectRequest);

            return imageFileName;
        }catch (Exception e){
            throw new RuntimeException("파일 업로드 에러" + e);
        }
    }

}
