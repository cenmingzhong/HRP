package com.gzhh.hrp.common.entity.format;

import java.util.Date;

public class CodeFormatAccording {

    private String vouchType;
    private Date vouchDate;
    private String whCode;
    private String busType;
    private String classCode;
    
    public String getVouchType() {
        return vouchType;
    }
    public void setVouchType(String vouchType) {
        this.vouchType = vouchType;
    }
    public Date getVouchDate() {
        return vouchDate;
    }
    public void setVouchDate(Date vouchDate) {
        this.vouchDate = vouchDate;
    }
    public String getWhCode() {
        return whCode;
    }
    public void setWhCode(String whCode) {
        this.whCode = whCode;
    }
    public String getBusType() {
        return busType;
    }
    public void setBusType(String busType) {
        this.busType = busType;
    }
    public String getClassCode() {
        return classCode;
    }
    public void setClassCode(String classCode) {
        this.classCode = classCode;
    }
}
