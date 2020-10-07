package com.gzhh.hrp.common;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

public class LoginUser {

    private String sysUserCode;
    private String sysUserName;
    private String sysUserAccount;
    private boolean isAdmin;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date loginDate;
    private String deptCode;
    private String deptName;
    private Object sessionData;
    private String accountId;
    private String accountYear;
    private String itemClass;
    private Integer fileRole;
    private Boolean isCW;
    private List<String> roleNameList;
    
    public String getSysUserCode() {
        return sysUserCode;
    }
    public void setSysUserCode(String sysUserCode) {
        this.sysUserCode = sysUserCode;
    }
    public String getSysUserName() {
        return sysUserName;
    }
    public void setSysUserName(String sysUserName) {
        this.sysUserName = sysUserName;
    }
    public String getSysUserAccount() {
        return sysUserAccount;
    }
    public void setSysUserAccount(String sysUserAccount) {
        this.sysUserAccount = sysUserAccount;
    }
    public boolean getIsAdmin() {
        return isAdmin;
    }
    public void setIsAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }
    public Date getLoginDate() {
        return loginDate;
    }
    public void setLoginDate(Date loginDate) {
        this.loginDate = loginDate;
    }
    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }
    public String getDeptName() {
        return deptName;
    }
    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }
    public String getAccountId() {
        return accountId;
    }
    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }
    public String getAccountYear() {
        return accountYear;
    }
    public void setAccountYear(String accountYear) {
        this.accountYear = accountYear;
    }
    public String getItemClass() {
        return itemClass;
    }
    public void setItemClass(String itemClass) {
        this.itemClass = itemClass;
    }
    public Object getSessionData() {
        return sessionData;
    }
    public void setSessionData(Object sessionData) {
        this.sessionData = sessionData;
    }
	public List<String> getRoleNameList() {
		return roleNameList;
	}
	public void setRoleNameList(List<String> roleNameList) {
		this.roleNameList = roleNameList;
	}
	public Boolean isCW() {
		return isCW;
	}
	public void setCW(Boolean isCW) {
		this.isCW = isCW;
	}
	public Integer getFileRole() {
		return fileRole;
	}
	public void setFileRole(Integer fileRole) {
		this.fileRole = fileRole;
	}
	public Boolean getIsCW() {
		return isCW;
	}
	public void setIsCW(Boolean isCW) {
		this.isCW = isCW;
	}
	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}
}
