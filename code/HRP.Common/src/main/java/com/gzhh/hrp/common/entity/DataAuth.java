package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sys_Data_Auth")
public class DataAuth {

    @Id
    @Column(name="id")
    private String id;
    
    @Column(name="sys_role_code")
    private String sysRoleCode;
    
    @Column(name="auth_code")
    private String authCode;
    
    @Column(name="auth_type")
    private String authType;
    
    @Column(name="auth_name")
    private String authName;
    
    @Column(name="selected")
    private Boolean selected;
    
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
	public String getSysRoleCode() {
		return sysRoleCode;
	}
	public void setSysRoleCode(String sysRoleCode) {
		this.sysRoleCode = sysRoleCode;
	}
	public String getAuthCode() {
		return authCode;
	}
	public void setAuthCode(String authCode) {
		this.authCode = authCode;
	}
	public String getAuthType() {
		return authType;
	}
	public void setAuthType(String authType) {
		this.authType = authType;
	}
	public String getAuthName() {
		return authName;
	}
	public void setAuthName(String authName) {
		this.authName = authName;
	}
	public Boolean getSelected() {
		return selected;
	}
	public void setSelected(Boolean selected) {
		this.selected = selected;
	}
    
}
