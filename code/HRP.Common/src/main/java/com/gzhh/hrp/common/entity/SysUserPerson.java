package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Sys_User_Person")
public class SysUserPerson extends BaseEntity{
    
    @Id
    @Column(name="Sys_User_Code",length=50)
    private String sysUserCode;
    
    @Column(name="Org_Code",length=20)
    private String orgCode;
    
    @Column(name="Person_Code",length=20)
    private String personCode;

    public String getSysUserCode() {
        return sysUserCode;
    }

    public void setSysUserCode(String sysUserCode) {
        this.sysUserCode = sysUserCode;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getPersonCode() {
        return personCode;
    }

    public void setPersonCode(String personCode) {
        this.personCode = personCode;
    }

}
