package com.example.animal_travel.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer{
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Autowired
    private AuthEntryPoint authEntryPoint;

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(
                    c -> c.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .exceptionHandling(
                        (exception)-> exception.authenticationEntryPoint(authEntryPoint)
                )
                .authorizeHttpRequests(
                        authorize -> authorize
                                .requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/api/staticData/**").permitAll()
                                .requestMatchers("/").permitAll()
                                .requestMatchers("/register").permitAll()
                                .requestMatchers("/login").permitAll()
                                .requestMatchers("/account").permitAll()
                                .requestMatchers("/travels").permitAll()
                                .requestMatchers("/map").permitAll()
                                .requestMatchers("/help").permitAll()
                                .requestMatchers("/*.html").permitAll()
                                .requestMatchers("/static/**").permitAll()
                                .requestMatchers("/favicon.ico").permitAll()
                                .requestMatchers("/sample_avatar.jpg").permitAll()
                                .requestMatchers("/logo192.png").permitAll()
                                .requestMatchers("/logo512.png").permitAll()
                                .anyRequest().authenticated()
                )
                .addFilterBefore(
                        jwtFilter, UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}