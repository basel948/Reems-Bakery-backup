package com.bluetech.shopNgo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class ShopNgoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShopNgoApplication.class, args);
		System.out.println("ShopNgoApplication is running...");
	}

	@Configuration
	public class WebConfig implements WebMvcConfigurer {

		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**")
					.allowedOrigins("http://localhost:5173") // Replace with your frontend application's URL
					.allowedMethods("GET", "POST", "PUT", "DELETE");
		}

		@Override
		public void addResourceHandlers(ResourceHandlerRegistry registry){
			registry.addResourceHandler("/MenuItemsImages/**")
					.addResourceLocations("classpath:/static/MenuItemsImages/")
					.setCacheControl(CacheControl.maxAge(2, TimeUnit.HOURS).cachePublic());
		}


	}
}
