package driverLicense.service;

import driverLicense.entity.DriverEntity;
import driverLicense.repo.DriverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DriverServiceImpl implements DriverService{

    @Autowired
    DriverRepo driverRepo;

    @Override
    public void write(DriverEntity driverEntity) {
        driverRepo.save(driverEntity);
    }


}
