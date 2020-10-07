package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

import com.gzhh.hrp.tools.StringTools;

@Entity
@Table(name="Sys_Vouch_Foot")
public class VouchFootField {
    
    @Id
    @Column
    private String id;
    
    @Column(name="Vouch_Type")
    private String vouchType;

    @XmlAttribute(name="code")
    @Column(name="code",length=50)
    private String code;

    @XmlAttribute(name="name")
    @Column(name="name",length=50)
    private String name;

    @XmlAttribute(name="text")
    @Column(name="text",length=50)
    private String text;
    
    @Column
    private int length;

    @XmlAttribute(name="isSystem")
    @Column(name="is_system")
    private boolean isSystem;

    @XmlAttribute(name="isShow")
    @Column(name="is_Show")
    private boolean isShow;

    @XmlAttribute(name="isRequired")
    @Column(name="is_required")
    private boolean isRequired;

    @XmlAttribute(name="isInput")
    @Column(name="is_input")
    private boolean isInput;

    @XmlElement(name="fieldHtml")
    @Column(name="field_Html", length=500)
    private String fieldHtml;
    
    @Column(name="field_order")
    private int fieldOrder;

    @XmlAttribute(name="columnField")
    @Column(name="column_Field")
    private String columnField;
    
    @XmlAttribute(name="dataType")
    @Column(name="data_type")
    private String dataType;
    
    @XmlTransient
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @XmlTransient
    public String getVouchType() {
        return vouchType;
    }

    public void setVouchType(String vouchType) {
        this.vouchType = vouchType;
    }

    @XmlTransient
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @XmlTransient
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @XmlTransient
    public String getText() {
        if(StringTools.isEmpty(this.text)){
            this.text = this.name;
        }
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }
    
    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    @XmlTransient
    public boolean getIsSystem() {
        return isSystem;
    }

    public void setIsSystem(boolean isSystem) {
        this.isSystem = isSystem;
    }

    @XmlTransient
    public boolean getIsShow() {
        return isShow;
    }

    public void setIsShow(boolean isShow) {
        this.isShow = isShow;
    }

    @XmlTransient
    public boolean getIsRequired() {
        return isRequired;
    }

    public void setIsRequired(boolean isRequired) {
        this.isRequired = isRequired;
    }

    @XmlTransient
    public boolean getIsInput() {
        return isInput;
    }

    public void setIsInput(boolean isInput) {
        this.isInput = isInput;
    }

    @XmlTransient
    public String getFieldHtml() {
        if(StringTools.isEmpty(fieldHtml)){
            return "<input type=\"text\" id=\"txt_"+code+"\" name=\""+code+"\"/>";
        }
        return fieldHtml;
    }

    public void setFieldHtml(String fieldHtml) {
        this.fieldHtml = fieldHtml;
    }

    @XmlTransient
    public int getFieldOrder() {
        return fieldOrder;
    }

    public void setFieldOrder(int fieldOrder) {
        this.fieldOrder = fieldOrder;
    }

    @XmlTransient
    public String getColumnField() {
        return columnField;
    }

    public void setColumnField(String columnField) {
        this.columnField = columnField;
    }

    @XmlTransient
    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }
    
}
