package user.dto;

import booking.entity.BookingEntity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.*;
import wishList.dto.WishListDTO;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileDTO {



    private String id;
    private String email;
    private String name;
    private String imageUrl;
    private String driver;
    private String phone_number;
    private String phoneNumber;
    private String profile_image;//프로필 이미지


    private String image_file_name; // 클라우등 이미지 uri
    private String image_original_name; //실제 이름
    private List<WishListDTO> wishList = new ArrayList<>();



    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getImage_file_name() {
        return image_file_name;
    }

    public void setImage_file_name(String image_file_name) {
        this.image_file_name = image_file_name;
    }

    public String getImage_original_name() {
        return image_original_name;
    }

    public void setImage_original_name(String image_original_name) {
        this.image_original_name = image_original_name;
    }
}
