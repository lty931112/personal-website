package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 系统用户实体类
 * 对应数据库表：sys_user
 *
 * @author personal
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_user")
public class SysUser extends BaseEntity {

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码（BCrypt 加密存储）
     */
    private String password;

    /**
     * 昵称
     */
    private String nickname;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 头像 URL
     */
    private String avatar;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 角色（ADMIN-管理员，USER-普通用户）
     */
    private String role;

    /**
     * 账号状态（0-禁用，1-启用）
     */
    private Integer status;

    /**
     * 最后登录时间
     */
    private java.time.LocalDateTime lastLoginTime;
}
