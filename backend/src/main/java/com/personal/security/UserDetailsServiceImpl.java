package com.personal.security;

import com.personal.entity.SysUser;
import com.personal.mapper.SysUserMapper;
import com.personal.common.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * 用户详情服务实现类
 * 实现 Spring Security 的 UserDetailsService 接口
 * 用于在 JWT 认证过程中加载用户信息
 *
 * @author personal
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final SysUserMapper sysUserMapper;

    /**
     * 根据用户名加载用户详情
     *
     * @param username 用户名
     * @return UserDetails 用户详情
     * @throws UsernameNotFoundException 用户不存在时抛出
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 查询用户
        SysUser user = sysUserMapper.selectByUsername(username);

        if (user == null) {
            log.warn("用户不存在：{}", username);
            throw new UsernameNotFoundException("用户不存在：" + username);
        }

        // 检查账号状态
        if (user.getStatus() != null && user.getStatus() == 0) {
            log.warn("账号已禁用：{}", username);
            throw new BusinessException(403, "账号已被禁用");
        }

        // 构建权限列表
        List<SimpleGrantedAuthority> authorities;
        if ("ADMIN".equals(user.getRole())) {
            authorities = List.of(
                    new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_USER")
            );
        } else {
            authorities = Collections.singletonList(
                    new SimpleGrantedAuthority("ROLE_USER")
            );
        }

        // 返回 Spring Security 的 UserDetails
        return new User(
                user.getUsername(),
                user.getPassword(),
                authorities
        );
    }
}
