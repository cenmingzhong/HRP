package com.gzhh.hrp.common.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="SYS_Upload_File")
public class UploadFile extends BaseEntity {

    @Id
    @Column(name="file_id")
    private String fileId;

    @Column(name="app_key")
    private String appKey;

    @Column(name="vouch_type")
    private String vouchType;

    @Column(name="vouch_no")
    private String vouchNo;

    @Column(name="file_name")
    private String fileName;

    @Column(name="file_extension")
    private String fileExtension;

    @Column(name="file_url")
    private String fileUrl;

    @Column(name="file_path")
    private String filePath;

    @Column(name="file_size")
    private String fileSize;

    @Column(name="file_md5")
    private String fileMd5;

    @Column(name="upload_man")
    private String uploadMan;

    @Column(name="upload_time")
    private Date uploadTime;

    @Column(name="thum_url")
    private String thumUrl;

    @Column(name="thum_path")
    private String thumPath;
    
    public String getFileId() {
        return fileId;
    }
    public void setFileId(String fileId) {
        this.fileId = fileId;
    }
    public String getAppKey() {
        return appKey;
    }
    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }
    public String getVouchType() {
        return vouchType;
    }
    public void setVouchType(String vouchType) {
        this.vouchType = vouchType;
    }
    public String getVouchNo() {
        return vouchNo;
    }
    public void setVouchNo(String vouchNo) {
        this.vouchNo = vouchNo;
    }
    public String getFileName() {
        return fileName;
    }
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    public String getFileExtension() {
        return fileExtension;
    }
    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }
    public String getFileUrl() {
        return fileUrl;
    }
    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }
    public String getFilePath() {
        return filePath;
    }
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
    public String getFileSize() {
        return fileSize;
    }
    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }
    public String getFileMd5() {
        return fileMd5;
    }
    public void setFileMd5(String fileMd5) {
        this.fileMd5 = fileMd5;
    }
    public String getUploadMan() {
        return uploadMan;
    }
    public void setUploadMan(String uploadMan) {
        this.uploadMan = uploadMan;
    }
    public Date getUploadTime() {
        return uploadTime;
    }
    public void setUploadTime(Date uploadTime) {
        this.uploadTime = uploadTime;
    }
    public String getThumUrl() {
        return thumUrl;
    }
    public void setThumUrl(String thumUrl) {
        this.thumUrl = thumUrl;
    }
    public String getThumPath() {
        return thumPath;
    }
    public void setThumPath(String thumPath) {
        this.thumPath = thumPath;
    }
    
}
