package com.example.bankcar;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@ComponentScan(basePackages = {"login.*","driverLicense.*","chat.*"})
@CrossOrigin(origins = "http://localhost:3000")
@EntityScan(basePackages = {"login.dto","driverLicense.entity","chat.bean"})
@EnableJpaRepositories(basePackages = {"login.dao","driverLicense.repo", "chat.repository"})

public class BankCarApplication {

    public static void main(String[] args) {
        SpringApplication.run(BankCarApplication.class, args);
    }

}
