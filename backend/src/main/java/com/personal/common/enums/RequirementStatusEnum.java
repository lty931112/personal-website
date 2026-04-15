package com.personal.common.enums;

import lombok.Getter;

/**
 * 需求状态枚举
 *
 * @author personal
 */
@Getter
public enum RequirementStatusEnum {

    /**
     * 待处理
     */
    PENDING(0, "待处理"),

    /**
     * 处理中
     */
    PROCESSING(1, "处理中"),

    /**
     * 已完成
     */
    COMPLETED(2, "已完成"),

    /**
     * 已关闭
     */
    CLOSED(3, "已关闭");

    private final int code;
    private final String description;

    RequirementStatusEnum(int code, String description) {
        this.code = code;
        this.description = description;
    }

    /**
     * 根据 code 获取枚举
     */
    public static RequirementStatusEnum fromCode(int code) {
        for (RequirementStatusEnum status : values()) {
            if (status.getCode() == code) {
                return status;
            }
        }
        throw new IllegalArgumentException("未知的需求状态码: " + code);
    }
}
