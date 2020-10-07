package com.gzhh.hrp.common;

import java.util.Date;

public class LoginState {

    private String sysUserCode;
    private Date lastActiveTime;
    private Date loginTime;
    private String sessionId;
    private LoginUser loginUser;
    private Date loginDate;
    private String dbName;
    private String accountId;
    private Integer accountYear;
    private String itemClass;
    private String fundSrcDefine;
    private Boolean  isFundSrc;
    private Boolean isU810;
    
    public String getSysUserCode() {
        return sysUserCode;
    }
    public void setSysUserCode(String sysUserCode) {
        this.sysUserCode = sysUserCode;
    }
    public Date getLastActiveTime() {
        return lastActiveTime;
    }
    public void setLastActiveTime(Date lastActiveTime) {
        this.lastActiveTime = lastActiveTime;
    }
    public Date getLoginTime() {
        return loginTime;
    }
    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }
    public String getSessionId() {
        return sessionId;
    }
    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
    public LoginUser getLoginUser() {
        return loginUser;
    }
    public void setLoginUser(LoginUser loginUser) {
        this.loginUser = loginUser;
    }
    public Date getLoginDate() {
        return loginDate;
    }
    public void setLoginDate(Date loginDate) {
        this.loginDate = loginDate;
    }
    public String getDbName() {
        return dbName;
    }
    public void setDbName(String dbName) {
        this.dbName = dbName;
    }
    public String getAccountId() {
        return accountId;
    }
    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }
    public Integer getAccountYear() {
        return accountYear;
    }
    public void setAccountYear(Integer accountYear) {
        this.accountYear = accountYear;
    }
    public String getItemClass() {
        return itemClass;
    }
    public void setItemClass(String itemClass) {
        this.itemClass = itemClass;
    }
    public String getFundSrcDefine() {
        return fundSrcDefine;
    }
    public void setFundSrcDefine(String fundSrcDefine) {
        this.fundSrcDefine = fundSrcDefine;
    }
    public Boolean getIsFundSrc() {
        return isFundSrc;
    }
    public void setIsFundSrc(Boolean isFundSrc) {
        this.isFundSrc = isFundSrc;
    }
    public Boolean getIsU810() {
        return isU810;
    }
    public void setIsU810(Boolean isU810) {
        this.isU810 = isU810;
    }
    
    
    
}
