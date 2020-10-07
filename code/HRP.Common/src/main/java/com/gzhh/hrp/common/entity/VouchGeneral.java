package com.gzhh.hrp.common.entity;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlTransient;

public class VouchGeneral extends BaseEntity {

    @XmlAttribute(name="code")
    private String code;
    
    @XmlAttribute(name="name")
    private String name;
    
    @XmlAttribute(name="appName")
    private String appName;

    @XmlElementWrapper(name="headList")
    @XmlElement(name="headField")
    private List<VouchHeadField> headList;
    
    @XmlElementWrapper(name="bodyList")
    @XmlElement(name="bodyField")
    private List<VouchBodyField> bodyList;
    
    @XmlElementWrapper(name="footList")
    @XmlElement(name="footField")
    private List<VouchFootField> footList;
 
    @XmlTransient
    public String getCode() {
        return code;
    }

    @XmlTransient
    public String getName() {
        return name;
    }

    @XmlTransient
    public List<VouchHeadField> getHeadList() {
        return headList;
    }

    @XmlTransient
    public List<VouchBodyField> getBodyList() {
        return bodyList;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setHeadList(List<VouchHeadField> headList) {
        this.headList = headList;
    }

    public void setBodyList(List<VouchBodyField> bodyList) {
        this.bodyList = bodyList;
    }

    @XmlTransient
    public List<VouchFootField> getFootList() {
        return footList;
    }

    public void setFootList(List<VouchFootField> footList) {
        this.footList = footList;
    }

    @XmlTransient
    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }
}
