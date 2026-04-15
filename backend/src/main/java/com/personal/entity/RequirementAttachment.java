package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 * 需求附件实体类
 * 对应数据库表：requirement_attachment
 *
 * @author personal
 */
@Data
@TableName("requirement_attachment")
public class RequirementAttachment implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键 ID
     */
    private Long id;

    /**
     * 需求 ID
     */
    private Long requirementId;

    /**
     * 文件 ID（关联 sys_file 表）
     */
    private Long fileId;

    /**
     * 文件名称
     */
    private String fileName;

    /**
     * 文件大小（字节）
     */
    private Long fileSize;

    /**
     * 文件类型（MIME）
     */
    private String fileType;
}
