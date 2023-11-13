package com.example.YakubOzten;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication(exclude = {
		//SecurityAutoConfiguration.class,
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
		org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration.class
}
)
// @SpringBootApplication
public class 	ToDoListProjectApplication {

	@PostConstruct
	public void init(){
		TimeZone.setDefault(TimeZone.getTimeZone("IST"));
	}
	public static void main(String[] args)
	{
		// JOptional pane aktif etmek
		System.setProperty("java.awt.headless","false");
        // Main
		SpringApplication.run(ToDoListProjectApplication.class, args);
	}//end main
}//end class
