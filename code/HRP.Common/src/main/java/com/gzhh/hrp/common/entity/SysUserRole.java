package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Sys_User_Role")
public class SysUserRole extends BaseEntity{
    @Id
    @Column(name="Id")
    private String id;
    
    @Column(name="Sys_User_Code",length=50)
    private String sysUserCode;
    
    @Column(name="Sys_Role_Code",length=50)
    private String sysRoleCode;

    public String getSysUserCode() {
        return sysUserCode;
    }

    public void setSysUserCode(String sysUserCode) {
        this.sysUserCode = sysUserCode;
    }

    public String getSysRoleCode() {
        return sysRoleCode;
    }

    public void setSysRoleCode(String sysRoleCode) {
        this.sysRoleCode = sysRoleCode;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
}
