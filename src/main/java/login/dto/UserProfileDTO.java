package login.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {



    private String id;
    private String email;
    private String name;
    private String imageUrl;
    private String driver;
    private String phone_number;

    private String image_file_name; // 클라우등 이미지 uri
    private String image_original_name; //실제 이름

}
