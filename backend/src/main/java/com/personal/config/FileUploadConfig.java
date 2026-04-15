package com.personal.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * 文件上传配置类
 * 从 application.yml 中读取文件上传相关配置
 *
 * @author personal
 */
@Data
@Configuration
@ConfigurationProperties(prefix = "file.upload")
public class FileUploadConfig {

    /**
     * 上传文件最大大小（默认 50MB）
     */
    private long maxFileSize = 50 * 1024 * 1024;

    /**
     * 请求最大大小（默认 100MB）
     */
    private long maxRequestSize = 100 * 1024 * 1024;

    /**
     * 允许的文件类型
     */
    private String[] allowedTypes = {
            "image/jpeg", "image/png", "image/gif", "image/webp",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/plain",
            "application/zip"
    };

    /**
     * MinIO 服务地址
     */
    private String endpoint;

    /**
     * MinIO 访问密钥
     */
    private String accessKey;

    /**
     * MinIO 密钥
     */
    private String secretKey;

    /**
     * MinIO 存储桶名称
     */
    private String bucketName;
}
