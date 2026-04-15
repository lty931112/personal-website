package com.personal;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * 个人网站后端服务 - Spring Boot 启动类
 *
 * @author personal
 */
@SpringBootApplication
@MapperScan("com.personal.mapper")
@EnableScheduling
public class PersonalWebsiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(PersonalWebsiteApplication.class, args);
    }
}
