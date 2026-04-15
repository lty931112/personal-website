package com.personal.service;

import com.personal.entity.SysFile;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件服务接口
 * 定义文件上传和管理相关的业务方法
 *
 * @author personal
 */
public interface FileService {

    /**
     * 上传文件
     *
     * @param file 上传的文件
     * @return 文件实体信息
     */
    SysFile uploadFile(MultipartFile file);

    /**
     * 根据 ID 获取文件信息
     *
     * @param id 文件 ID
     * @return 文件实体
     */
    SysFile getFileById(Long id);

    /**
     * 根据 ID 删除文件
     *
     * @param id 文件 ID
     */
    void deleteFile(Long id);

    /**
     * 获取文件的访问 URL
     *
     * @param fileId 文件 ID
     * @return 文件访问 URL
     */
    String getFileUrl(Long fileId);
}
