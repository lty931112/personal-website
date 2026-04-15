package com.personal.controller;

import com.personal.common.Result;
import com.personal.dto.request.LoginRequest;
import com.personal.dto.response.LoginResponse;
import com.personal.security.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 认证控制器
 * 提供登录、注册等认证相关接口
 *
 * @author personal
 */
@Tag(name = "认证管理", description = "用户登录认证相关接口")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 用户登录
     * 验证用户名密码，生成 JWT Token
     */
    @Operation(summary = "用户登录")
    @PostMapping("/login")
    public Result<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        // 使用 Spring Security 进行认证
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        // 设置认证上下文
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 生成 JWT Token
        String token = jwtTokenProvider.generateToken(authentication);

        // 构建登录响应
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        response.setExpiresIn(jwtTokenProvider.getExpirationInSeconds());
        response.setUsername(request.getUsername());

        // 从认证信息中提取用户详情
        authentication.getAuthorities().forEach(authority -> {
            if (authority.getAuthority().startsWith("ROLE_")) {
                response.setRole(authority.getAuthority().substring(5));
            }
        });

        return Result.success("登录成功", response);
    }
}
