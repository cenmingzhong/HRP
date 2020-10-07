package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="User_Proj")
public class SysUserProj extends BaseEntity{
    @Id
    @Column(name="Id")
    private String id;
    
    @Column(name="Sys_User_Code",length=50)
    private String sysUserCode;
    
    @Column(name="Proj_Code",length=50)
    private String projCode;
	
	@Column(name="Proj_Name",length=50)
    private String projName;
	
	@Column(name="Proj_Time",length=50)
    private Float projTime;

    public String getProjName() {
		return projName;
	}

	public void setProjName(String projName) {
		this.projName = projName;
	}

	public Float getProjTime() {
		return projTime;
	}

	public void setProjTime(Float projTime) {
		this.projTime = projTime;
	}

	public String getSysUserCode() {
        return sysUserCode;
    }

    public void setSysUserCode(String sysUserCode) {
        this.sysUserCode = sysUserCode;
    }

    public String getProjCode() {
        return projCode;
    }

    public void setProjCode(String projCode) {
        this.projCode = projCode;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
}
