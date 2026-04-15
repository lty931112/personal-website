package com.personal.common.enums;

import lombok.Getter;

/**
 * 通用状态枚举
 *
 * @author personal
 */
@Getter
public enum StatusEnum {

    /**
     * 禁用/下架
     */
    DISABLED(0, "禁用"),

    /**
     * 启用/上架
     */
    ENABLED(1, "启用");

    private final int code;
    private final String description;

    StatusEnum(int code, String description) {
        this.code = code;
        this.description = description;
    }

    /**
     * 根据 code 获取枚举
     */
    public static StatusEnum fromCode(int code) {
        for (StatusEnum status : values()) {
            if (status.getCode() == code) {
                return status;
            }
        }
        throw new IllegalArgumentException("未知的状态码: " + code);
    }
}
