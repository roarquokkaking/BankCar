package com.example.bankcar;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@ComponentScan(basePackages = {"login.*","driverLicense.*","chat.*","car.*","search.*","payment.*"})
@CrossOrigin(origins = "*")

@EntityScan(basePackages = {"login.dto","driverLicense.entity","chat.entity","car.entity","search.bean","payment.entity"})
@EnableJpaRepositories(basePackages = {"login.dao","driverLicense.repo","chat.repository","car.repo","search.dao","payment.repo"})
@ComponentScan(basePackages = {"login.*","driverLicense.*","user.*" ,"booking.*","chat.*","car.*","wishList.*","search.*","main.*","payment.*"})
@EntityScan(basePackages = {"login.dto","driverLicense.entity","chat.dto","booking.entity","chat.bean","car.entity","wishList.entity","chat.entity","search.bean","chat.entity"})
@EnableJpaRepositories(basePackages = {"login.dao","driverLicense.repo","user.repository","booking.repository", "chat.repository","car.repo","wishList.repository","search.dao","main.repository"})
public class BankCarApplication {

    public static void main(String[] args) {
        SpringApplication.run(BankCarApplication.class, args);
    }

}
