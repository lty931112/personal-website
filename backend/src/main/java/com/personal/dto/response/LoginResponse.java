package com.personal.dto.response;

import lombok.Data;

/**
 * 登录响应 DTO
 *
 * @author personal
 */
@Data
public class LoginResponse {

    /**
     * JWT Token
     */
    private String token;

    /**
     * Token 类型（Bearer）
     */
    private String tokenType = "Bearer";

    /**
     * 过期时间（秒）
     */
    private Long expiresIn;

    /**
     * 用户 ID
     */
    private Long userId;

    /**
     * 用户名
     */
    private String username;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 角色
     */
    private String role;
}
