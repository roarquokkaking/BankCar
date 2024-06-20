package choice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    private String userId;
    private String email;
    private String name;
    private boolean driver;
    private String profileImage;
    private String phoneNumber;
    private LocalDateTime createDate;
    private Float rating;
    private String imageFileName;
    private String imageOriginalName;
}
