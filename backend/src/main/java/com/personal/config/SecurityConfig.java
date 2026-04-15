package com.personal.config;

import com.personal.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Spring Security 安全配置类
 * 配置 JWT 无状态认证，禁用 Session，设置接口访问权限
 *
 * @author personal
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    /**
     * 密码编码器 - 使用 BCrypt 加密算法
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 认证管理器
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * 安全过滤器链配置
     * - 禁用 CSRF（前后端分离，使用 JWT）
     * - 禁用 Session（无状态认证）
     * - 配置接口访问权限
     * - 添加 JWT 认证过滤器
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 禁用 CSRF（前后端分离项目不需要）
                .csrf(AbstractHttpConfigurer::disable)
                // 禁用 Session，使用无状态 JWT 认证
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // 配置接口访问权限
                .authorizeHttpRequests(auth -> auth
                        // 放行 Swagger/OpenAPI 相关接口
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/v3/api-docs"
                        ).permitAll()
                        // 放行认证相关接口
                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()
                        // 放行公开接口（产品列表、博客列表、知识库检索等）
                        .requestMatchers(
                                "/api/products/**",
                                "/api/blogs/**",
                                "/api/knowledge/search",
                                "/api/requests/submit"
                        ).permitAll()
                        // 文件上传接口需要认证
                        .requestMatchers("/api/files/**").authenticated()
                        // 管理接口需要 ADMIN 角色
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // 其他所有接口需要认证
                        .anyRequest().authenticated()
                )
                // 在 UsernamePasswordAuthenticationFilter 之前添加 JWT 过滤器
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
