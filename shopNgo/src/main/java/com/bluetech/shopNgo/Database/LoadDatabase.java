package com.bluetech.shopNgo.Database;

import com.bluetech.shopNgo.Models.ERole;
import com.bluetech.shopNgo.Models.Role;
import com.bluetech.shopNgo.Security.JWT.AuthEntryPointJwt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class LoadDatabase {
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

    @Bean
    CommandLineRunner initDatabase(RoleRepository role){
        return args -> {
            logger.info("Preloading " + role.save(new Role(1 , ERole.ROLE_USER)));
            logger.info("Preloading " + role.save(new Role(2 , ERole.ROLE_ADMIN)));
        };
    }
}
