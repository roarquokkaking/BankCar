package com.example.bankcar;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*")
@ComponentScan(basePackages = {"login.*","driverLicense.*","user.*" ,"booking.*","chat.*","car.*","wishList.*","search.*","main.*","payment.*","spark","review.*"})
@EntityScan(basePackages = {"login.dto","driverLicense.entity","booking.entity","car.entity","wishList.entity","search.bean","chat.entity","payment.entity","review.entity"})
@EnableJpaRepositories(basePackages = {"login.dao","driverLicense.repo","user.repository","booking.repository", "chat.repository","car.repo","wishList.repository","main.repository","payment.repo","search.repo","review.repository"})
public class BankCarApplication {

    public static void main(String[] args) {
        SpringApplication.run(BankCarApplication.class, args);
    }

}
