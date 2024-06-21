package choice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CombineDTO {
    private CarDTO carInfo;
//    private List<ReviewDTO> reviews;
    private UserDTO userInfo;
}
