package com.gzhh.hrp.common.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Sys_Role")
public class SysRole extends BaseEntity {

    @Id
    @Column(name="Sys_Role_Code")
    private String sysRoleCode;
    
    @Column(name="Sys_Role_Name",length=50)
    private String sysRoleName;
    

    
    @Column(name="Sys_Role_Desc",length=500)
    private String sysRoleDesc;
    
    @Column(name="creator")
    private String creator;
    
    @Column(name="create_time")
    private Date createTime;

    
    @Column(name="report_role")
    private String reportRole;
    
    public String getReportRole() {
        return reportRole;
    }

    public void setReportRole(String reportRole) {
        this.reportRole = reportRole;
    }

    public String getSysRoleCode() {
        return sysRoleCode;
    }

    public void setSysRoleCode(String sysRoleCode) {
        this.sysRoleCode = sysRoleCode;
    }

    public String getSysRoleName() {
        return sysRoleName;
    }

    public void setSysRoleName(String sysRoleName) {
        this.sysRoleName = sysRoleName;
    }



    public String getSysRoleDesc() {
        return sysRoleDesc;
    }

    public void setSysRoleDesc(String sysRoleDesc) {
        this.sysRoleDesc = sysRoleDesc;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
    
    
}
