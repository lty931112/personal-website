package com.personal.service.impl;

import com.personal.common.BusinessException;
import com.personal.config.FileUploadConfig;
import com.personal.entity.SysFile;
import com.personal.mapper.SysFileMapper;
import com.personal.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.UUID;

/**
 * 文件服务实现类
 * 支持本地文件存储和 MinIO 对象存储
 *
 * @author personal
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

    private final SysFileMapper sysFileMapper;
    private final FileUploadConfig fileUploadConfig;

    @Override
    public SysFile uploadFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BusinessException("上传文件不能为空");
        }

        // 检查文件大小
        if (file.getSize() > fileUploadConfig.getMaxFileSize()) {
            throw new BusinessException("文件大小超过限制（最大 " + (fileUploadConfig.getMaxFileSize() / 1024 / 1024) + "MB）");
        }

        // 检查文件类型
        String contentType = file.getContentType();
        if (contentType != null && !Arrays.asList(fileUploadConfig.getAllowedTypes()).contains(contentType)) {
            throw new BusinessException("不支持的文件类型：" + contentType);
        }

        // 生成存储文件名
        String originalName = file.getOriginalFilename();
        String fileExt = getFileExtension(originalName);
        String storedName = UUID.randomUUID().toString().replace("-", "") + "." + fileExt;

        // 构建文件信息
        SysFile sysFile = new SysFile();
        sysFile.setOriginalName(originalName);
        sysFile.setStoredName(storedName);
        sysFile.setFileSize(file.getSize());
        sysFile.setFileType(contentType);
        sysFile.setFileExt(fileExt);
        sysFile.setStorageType("local");

        // TODO: 根据配置选择存储方式（本地/MinIO）
        // 本地存储路径
        String filePath = "/uploads/" + storedName;
        sysFile.setFilePath(filePath);
        sysFile.setFileUrl(filePath);

        sysFileMapper.insert(sysFile);

        log.info("文件上传成功：id={}, name={}, size={}", sysFile.getId(), originalName, file.getSize());
        return sysFile;
    }

    @Override
    public SysFile getFileById(Long id) {
        SysFile sysFile = sysFileMapper.selectById(id);
        if (sysFile == null) {
            throw new BusinessException("文件不存在");
        }
        return sysFile;
    }

    @Override
    public void deleteFile(Long id) {
        log.info("删除文件：id={}", id);
        SysFile sysFile = sysFileMapper.selectById(id);
        if (sysFile == null) {
            throw new BusinessException("文件不存在");
        }
        // TODO: 删除实际存储的文件
        sysFileMapper.deleteById(id);
    }

    @Override
    public String getFileUrl(Long fileId) {
        SysFile sysFile = getFileById(fileId);
        return sysFile.getFileUrl();
    }

    /**
     * 获取文件扩展名
     *
     * @param fileName 文件名
     * @return 文件扩展名（不含点号）
     */
    private String getFileExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) {
            return "";
        }
        return fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
    }
}
