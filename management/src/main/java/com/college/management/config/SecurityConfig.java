package com.college.management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll() // Allow all API endpoints without login
                .anyRequest().authenticated()           // Require login for any other page
            )
            .formLogin(form -> form.permitAll())       // Enable login form
            .httpBasic(Customizer.withDefaults());     // Enable basic auth (for testing with Postman)

        return http.build();
    }
}