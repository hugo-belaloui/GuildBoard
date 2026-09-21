package hugonelson.guildboard.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class DevSecurityConfig {

    /*  authorize all actions, expose all endpoints for easy dev life, even with Spring Security in pom
    todo : create a security profile suitable for production */

    @Bean
    public SecurityFilterChain devFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        http.csrf(csrf -> csrf.disable());
        return http.build();
    }
}