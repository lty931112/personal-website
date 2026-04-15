package com.personal.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * JWT Token 生成与验证工具类
 * 负责创建、解析和验证 JWT Token
 *
 * @author personal
 */
@Slf4j
@Component
public class JwtTokenProvider {

    /**
     * JWT 密钥（从配置文件读取）
     */
    @Value("${jwt.secret}")
    private String jwtSecret;

    /**
     * JWT 过期时间（毫秒，从配置文件读取）
     */
    @Value("${jwt.expiration}")
    private long jwtExpiration;

    /**
     * 生成 JWT Token
     *
     * @param authentication Spring Security 认证信息
     * @return JWT Token 字符串
     */
    public String generateToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return generateToken(userDetails.getUsername());
    }

    /**
     * 根据用户名生成 JWT Token
     *
     * @param username 用户名
     * @return JWT Token 字符串
     */
    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        return Jwts.builder()
                .subject(username)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * 从 Token 中提取用户名
     *
     * @param token JWT Token
     * @return 用户名
     */
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    /**
     * 验证 JWT Token 是否有效
     *
     * @param token JWT Token
     * @return true-有效，false-无效
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(getSigningKey()).build().parseSignedClaims(token);
            return true;
        } catch (SecurityException e) {
            log.error("JWT 签名无效：{}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("JWT 格式错误：{}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT 已过期：{}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT 不支持：{}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT 参数异常：{}", e.getMessage());
        }
        return false;
    }

    /**
     * 获取 Token 过期时间（秒）
     *
     * @return 过期时间（秒）
     */
    public long getExpirationInSeconds() {
        return jwtExpiration / 1000;
    }

    /**
     * 获取签名密钥
     *
     * @return SecretKey
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
}
