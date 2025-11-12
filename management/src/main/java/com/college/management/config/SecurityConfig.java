package com.college.management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/**").permitAll()   // ✅ Allow all API routes
                .anyRequest().permitAll()                 // ✅ Disable auth completely
            )
            .formLogin(login -> login.disable())          // ✅ Disable form login
            .httpBasic(basic -> basic.disable());         // ✅ Disable basic auth
        return http.build();
    }

    // ✅ Needed to fix your "PasswordEncoder bean not found" error
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
