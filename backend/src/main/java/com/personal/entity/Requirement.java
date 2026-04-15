package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * 需求实体类
 * 对应数据库表：requirement
 *
 * @author personal
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("requirement")
public class Requirement extends BaseEntity {

    /**
     * 需求标题
     */
    private String title;

    /**
     * 需求描述
     */
    private String description;

    /**
     * 需求类型（功能需求、Bug修复、优化建议、其他）
     */
    private String type;

    /**
     * 优先级（1-低，2-中，3-高，4-紧急）
     */
    private Integer priority;

    /**
     * 需求状态（0-待处理，1-处理中，2-已完成，3-已关闭）
     */
    private Integer status;

    /**
     * 提交人姓名
     */
    private String submitterName;

    /**
     * 提交人邮箱
     */
    private String submitterEmail;

    /**
     * 处理人 ID
     */
    private Long handlerId;

    /**
     * 处理备注
     */
    private String handleRemark;

    /**
     * 处理时间
     */
    private LocalDateTime handleTime;

    /**
     * 联系方式
     */
    private String contactInfo;
}
