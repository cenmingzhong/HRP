/**
 * ===========================================================================
 * 版权所有 2017 广州市辉海计算机科技有限公司，并保留所有权利。
 * ----------------------------------------------------------------------------
 * 提示：在未取得商业授权之前，您不能将本软件应用于商业用途，否则将保留追究的权力。
 * ----------------------------------------------------------------------------
 * 创 建 者：梁海成
 * 创建日期：2017-06-13 07:39:23
 * ----------------------------------------------------------------------------
 * 修改人       修改日期        修改内容
 * ===========================================================================
 *
*/
package com.gzhh.hrp.common.entity;

import javax.persistence.Entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Id;
import org.apache.ibatis.type.Alias;
import javax.persistence.Table;

import com.gzhh.hrp.common.entity.BaseEntity;


@Entity
@Table(name="Sys_Message_Remind")
@Alias("MessageRemind")
public class MessageRemind extends BaseEntity{
    
    @Id
    @Column(name="Id")    
    private String id;

    @Column(name="Message_Type")    
    private String messageType;

    @Column(name="Message_Name")    
    private String messageName;

    @Column(name="Message_Content")    
    private String messageContent;

    @Column(name="Vouch_Url")    
    private String vouchUrl;

    @Column(name="Psn_Code")    
    private String psnCode;

    @Column(name="Vouch_Code")    
    private String vouchCode;

    @Column(name="Inv_Name")    
    private String invName;

    @Column(name="Wh_Name")    
    private String whName;

    @Column(name="Creator")    
    private String creator;

    @Column(name="Create_Time")    
    private Date createTime;

    @Column(name="Sys_User_Code")    
    private String sysUserCode;

    @Column(name="Sys_Role_Code")    
    private String sysRoleCode;

    @Column(name="Dept_Code")    
    private String deptCode;

    @Column(name="Is_Read")    
    private Boolean isRead;

    @Column(name="Read_Time")    
    private Date readTime;

    @Column(name="Deal_Psn")    
    private String dealPsn;

    @Column(name="Deal_Time")    
    private Date dealTime;

    @Column(name="Deal_Result")    
    private String dealResult;

    @Column(name="Memo")    
    private String memo;

    
    /*获取*/
    public String getId() {
        return this.id;
    }
        
    /*设置*/
    public void setId(String id){
        this.id = id;
    }
        
    /*获取*/
    public String getMessageType() {
        return this.messageType;
    }
        
    /*设置*/
    public void setMessageType(String messageType){
        this.messageType = messageType;
    }
        
    /*获取*/
    public String getMessageName() {
        return this.messageName;
    }
        
    /*设置*/
    public void setMessageName(String messageName){
        this.messageName = messageName;
    }
        
    /*获取*/
    public String getMessageContent() {
        return this.messageContent;
    }
        
    /*设置*/
    public void setMessageContent(String messageContent){
        this.messageContent = messageContent;
    }
        
    /*获取*/
    public String getVouchUrl() {
        return this.vouchUrl;
    }
        
    /*设置*/
    public void setVouchUrl(String vouchUrl){
        this.vouchUrl = vouchUrl;
    }
        
    /*获取*/
    public String getPsnCode() {
        return this.psnCode;
    }
        
    /*设置*/
    public void setPsnCode(String psnCode){
        this.psnCode = psnCode;
    }
        
    /*获取*/
    public String getVouchCode() {
        return this.vouchCode;
    }
        
    /*设置*/
    public void setVouchCode(String vouchCode){
        this.vouchCode = vouchCode;
    }
        
    /*获取*/
    public String getInvName() {
        return this.invName;
    }
        
    /*设置*/
    public void setInvName(String invName){
        this.invName = invName;
    }
        
    /*获取*/
    public String getWhName() {
        return this.whName;
    }
        
    /*设置*/
    public void setWhName(String whName){
        this.whName = whName;
    }
        
    /*获取*/
    public String getCreator() {
        return this.creator;
    }
        
    /*设置*/
    public void setCreator(String creator){
        this.creator = creator;
    }
        
    /*获取*/
    public Date getCreateTime() {
        return this.createTime;
    }
        
    /*设置*/
    public void setCreateTime(Date createTime){
        this.createTime = createTime;
    }
        
    /*获取*/
    public String getSysUserCode() {
        return this.sysUserCode;
    }
        
    /*设置*/
    public void setSysUserCode(String sysUserCode){
        this.sysUserCode = sysUserCode;
    }
        
    /*获取*/
    public String getSysRoleCode() {
        return this.sysRoleCode;
    }
        
    /*设置*/
    public void setSysRoleCode(String sysRoleCode){
        this.sysRoleCode = sysRoleCode;
    }
        
    /*获取*/
    public String getDeptCode() {
        return this.deptCode;
    }
        
    /*设置*/
    public void setDeptCode(String deptCode){
        this.deptCode = deptCode;
    }
        
    /*获取*/
    public Boolean getIsRead() {
        return this.isRead;
    }
        
    /*设置*/
    public void setIsRead(Boolean isRead){
        this.isRead = isRead;
    }
        
    /*获取*/
    public Date getReadTime() {
        return this.readTime;
    }
        
    /*设置*/
    public void setReadTime(Date readTime){
        this.readTime = readTime;
    }
        
    /*获取*/
    public String getDealPsn() {
        return this.dealPsn;
    }
        
    /*设置*/
    public void setDealPsn(String dealPsn){
        this.dealPsn = dealPsn;
    }
        
    /*获取*/
    public Date getDealTime() {
        return this.dealTime;
    }
        
    /*设置*/
    public void setDealTime(Date dealTime){
        this.dealTime = dealTime;
    }
        
    /*获取*/
    public String getDealResult() {
        return this.dealResult;
    }
        
    /*设置*/
    public void setDealResult(String dealResult){
        this.dealResult = dealResult;
    }
        
    /*获取*/
    public String getMemo() {
        return this.memo;
    }
        
    /*设置*/
    public void setMemo(String memo){
        this.memo = memo;
    }
    
}