package com.personal.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 系统文件实体类
 * 对应数据库表：sys_file
 * 记录所有上传文件的信息
 *
 * @author personal
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName("sys_file")
public class SysFile extends BaseEntity {

    /**
     * 原始文件名
     */
    private String originalName;

    /**
     * 存储文件名（UUID 生成）
     */
    private String storedName;

    /**
     * 文件路径
     */
    private String filePath;

    /**
     * 文件 URL（访问地址）
     */
    private String fileUrl;

    /**
     * 文件大小（字节）
     */
    private Long fileSize;

    /**
     * 文件类型（MIME）
     */
    private String fileType;

    /**
     * 文件扩展名
     */
    private String fileExt;

    /**
     * 存储类型（local-本地，minio-对象存储）
     */
    private String storageType;

    /**
     * 上传者 ID
     */
    private Long uploaderId;
}
