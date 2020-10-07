package com.gzhh.hrp.common.entity.inf;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import com.gzhh.hrp.common.entity.inf.nc.Voucher;

@XmlRootElement(name="ufinterface")
public class UfInterface {

    @XmlAttribute(name="roottag")
    private String rootTag;
    
    @XmlAttribute(name="billtype")
    private String billType;
    
    @XmlAttribute(name="filename")
    private String fileName;
    
    @XmlAttribute(name="isexchange")
    private String isExchange;
    
    @XmlAttribute(name="proc")
    private String proc;
    
    @XmlAttribute(name="isDebug")
    private String isDebug;
    
    @XmlAttribute(name="receiver")
    private String receiver;
    
    @XmlAttribute(name="replace")
    private String replace;
    
    @XmlAttribute(name="sender")
    private String sender;
    
    @XmlAttribute(name="subtype")
    private String subType;
    
    @XmlAttribute(name="ic_bill")
    private String icBill;
    
    @XmlElement(name="voucher")
    private Voucher voucher;
    
    @XmlElement(name="sendresult")
    private SenderResult sendResult;

    @XmlTransient
    public String getRootTag() {
        return rootTag;
    }

    public void setRootTag(String rootTag) {
        this.rootTag = rootTag;
    }

    @XmlTransient
    public String getBillType() {
        return billType;
    }

    public void setBillType(String billType) {
        this.billType = billType;
    }

    @XmlTransient
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    @XmlTransient
    public String getIsExchange() {
        return isExchange;
    }

    public void setIsExchange(String isExchange) {
        this.isExchange = isExchange;
    }

    @XmlTransient
    public String getProc() {
        return proc;
    }

    public void setProc(String proc) {
        this.proc = proc;
    }

    @XmlTransient
    public String getIsDebug() {
        return isDebug;
    }

    public void setIsDebug(String isDebug) {
        this.isDebug = isDebug;
    }

    @XmlTransient
    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    @XmlTransient
    public String getReplace() {
        return replace;
    }

    public void setReplace(String replace) {
        this.replace = replace;
    }

    @XmlTransient
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    @XmlTransient
    public String getSubType() {
        return subType;
    }

    public void setSubType(String subType) {
        this.subType = subType;
    }

    @XmlTransient
    public String getIcBill() {
        return icBill;
    }

    public void setIcBill(String icBill) {
        this.icBill = icBill;
    }

    @XmlTransient
    public Voucher getVoucher() {
        return voucher;
    }

    public void setVoucher(Voucher voucher) {
        this.voucher = voucher;
    }

    @XmlTransient
    public SenderResult getSendResult() {
        return sendResult;
    }

    public void setSendResult(SenderResult sendResult) {
        this.sendResult = sendResult;
    }
    
}
