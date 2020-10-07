package com.gzhh.hrp.common.entity.inf;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

public class SenderResult {

    @XmlElement(name="billpk")
    private String billPk;

    @XmlElement(name="bdocid")
    private String docId;

    @XmlElement(name="filename")
    private String fileName;

    @XmlElement(name="resultcode")
    private String resultCode;

    @XmlElement(name="resultdescription")
    private String resultDescription;

    @XmlElement(name="content")
    private String content;

    @XmlTransient
    public String getBillPk() {
        return billPk;
    }

    public void setBillPk(String billPk) {
        this.billPk = billPk;
    }

    @XmlTransient
    public String getDocId() {
        return docId;
    }

    public void setDocId(String docId) {
        this.docId = docId;
    }

    @XmlTransient
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    @XmlTransient
    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }

    @XmlTransient
    public String getResultDescription() {
        return resultDescription;
    }

    public void setResultDescription(String resultDescription) {
        this.resultDescription = resultDescription;
    }

    @XmlTransient
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    
}
