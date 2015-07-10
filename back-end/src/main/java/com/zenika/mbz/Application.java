package com.zenika.mbz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@EnableSwagger2
@ComponentScan
public class Application{

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

/*
    @Bean
    public Docket mbzApi() {
        return new Docket(DocumentationType.SWAGGER_2).select().build();
    }
*/

}


