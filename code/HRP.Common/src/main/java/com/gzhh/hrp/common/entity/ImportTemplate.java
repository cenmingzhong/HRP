package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlTransient;

@Entity
@Table(name="SYS_Import_Template")
public class ImportTemplate {

    @Id
    @Column(name="id")
    @XmlAttribute(name="templateId")
    private String id;
    
    @Column(name="code")
    @XmlAttribute(name="templateCode")
    private String code;
    
    @Column(name="text")
    @XmlAttribute(name="templateText")
    private String text;
    
    @Column(name="data_Type")
    @XmlTransient
    private String dataType;
    
    @Column(name="db_Type")
    @XmlAttribute(name="templateType")
    private String dbType;
    
    @Column(name="is_Required")
    @XmlAttribute(name="isRequired")
    private boolean isRequired;
    
    @Column(name="field_Order")
    @XmlAttribute(name="fieldOrder")
    private int fieldOrder;
    
    @XmlTransient
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    @XmlTransient
    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    @XmlTransient
    public String getDataType() {
        return dataType;
    }
    public void setDataType(String dataType) {
        this.dataType = dataType;
    }
    @XmlTransient
    public String getDbType() {
        return dbType;
    }
    public void setDbType(String dbType) {
        this.dbType = dbType;
    }
    @XmlTransient
    public boolean getIsRequired() {
        return isRequired;
    }
    public void setIsRequired(boolean isRequired) {
        this.isRequired = isRequired;
    }
    @XmlTransient
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    @XmlTransient
    public int getFieldOrder() {
        return fieldOrder;
    }
    public void setFieldOrder(int fieldOrder) {
        this.fieldOrder = fieldOrder;
    }
}
