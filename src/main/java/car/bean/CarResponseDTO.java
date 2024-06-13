package car.bean;

import car.entity.Car;
import car.entity.CarImages;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarResponseDTO {
    private Car car;
    private CarImages carImages;

}
