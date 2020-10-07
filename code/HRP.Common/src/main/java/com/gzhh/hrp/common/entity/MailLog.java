package com.gzhh.hrp.common.entity;

import java.util.Date;

public class MailLog extends BaseEntity{
    private String id ;
    private String appKey ;
    private String vouchType ;
    private String vouchId ;
    private String emailAddress;
    private String emailSubject;
    private String emailContent ;
    private Date sendTime ;     
    private String Sender ;
    private boolean SendState ;
    private String Message ;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
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
    public String getVouchId() {
        return vouchId;
    }
    public void setVouchId(String vouchId) {
        this.vouchId = vouchId;
    }
    public String getEmailAddress() {
        return emailAddress;
    }
    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
    public String getEmailSubject() {
        return emailSubject;
    }
    public void setEmailSubject(String emailSubject) {
        this.emailSubject = emailSubject;
    }
    public String getEmailContent() {
        return emailContent;
    }
    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }
    public Date getSendTime() {
        return sendTime;
    }
    public void setSendTime(Date sendTime) {
        this.sendTime = sendTime;
    }
    public String getSender() {
        return Sender;
    }
    public void setSender(String sender) {
        Sender = sender;
    }
    public boolean isSendState() {
        return SendState;
    }
    public void setSendState(boolean sendState) {
        SendState = sendState;
    }
    public String getMessage() {
        return Message;
    }
    public void setMessage(String message) {
        Message = message;
    }
}
