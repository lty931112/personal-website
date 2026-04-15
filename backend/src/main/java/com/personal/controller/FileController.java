package com.personal.controller;

import com.personal.common.Result;
import com.personal.entity.SysFile;
import com.personal.service.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 文件上传控制器
 * 提供文件上传和管理接口
 *
 * @author personal
 */
@Tag(name = "文件管理", description = "文件上传和管理相关接口")
@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    /**
     * 上传文件
     */
    @Operation(summary = "上传文件")
    @PostMapping("/upload")
    public Result<SysFile> uploadFile(@RequestParam("file") MultipartFile file) {
        return Result.success(fileService.uploadFile(file));
    }

    /**
     * 获取文件信息
     */
    @Operation(summary = "获取文件信息")
    @GetMapping("/{id}")
    public Result<SysFile> getFileById(@PathVariable Long id) {
        return Result.success(fileService.getFileById(id));
    }

    /**
     * 获取文件访问 URL
     */
    @Operation(summary = "获取文件访问URL")
    @GetMapping("/{id}/url")
    public Result<String> getFileUrl(@PathVariable Long id) {
        return Result.success(fileService.getFileUrl(id));
    }

    /**
     * 删除文件
     */
    @Operation(summary = "删除文件")
    @DeleteMapping("/{id}")
    public Result<Void> deleteFile(@PathVariable Long id) {
        fileService.deleteFile(id);
        return Result.success();
    }
}
