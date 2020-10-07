package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlTransient;

import com.gzhh.hrp.tools.StringTools;

@Entity
@Table(name="Sys_Vouch_Body")
public class VouchBodyField {

    @Id
    @Column(name="id")
    private String id;
    
    @Column(name="Vouch_Type")
    private String vouchType;
    
    @XmlAttribute(name="code")
    @Column(name="code")
    private String code;
    
    @XmlAttribute(name="name")
    @Column(name="name")
    private String name;
    
    @XmlAttribute(name="text")
    @Column(name="text")
    private String text;
    
    @XmlAttribute(name="length")
    @Column(name="length")
    private int length;
    
    @XmlAttribute(name="dataType")
    @Column(name="data_type")
    private String dataType;
    
    @XmlAttribute(name="isRefer")
    @Column(name="is_refer")
    private boolean isRefer;
    
    @XmlAttribute(name="referTo")
    @Column(name="refer_To")
    private String referTo;
    
    @XmlAttribute(name="referField")
    @Column(name="refer_Field")
    private String referField;
    
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
    
    @Column(name="field_order")
    private int fieldOrder;

    @XmlAttribute(name="width")
    @Column(name="width")
    private int width;

    @XmlAttribute(name="align")
    @Column(name="align")
    private String align;

    @XmlAttribute(name="columnField")
    @Column(name="column_Field")
    private String columnField;
    
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
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }
    @XmlTransient
    public int getLength() {
        return length;
    }
    public void setLength(int length) {
        this.length = length;
    }
    @XmlTransient
    public String getDataType() {
        return dataType;
    }
    public void setDataType(String dataType) {
        this.dataType = dataType;
    }
    @XmlTransient
    public boolean getIsRefer() {
        return isRefer;
    }
    public void setIsRefer(boolean isRefer) {
        this.isRefer = isRefer;
    }
    @XmlTransient
    public String getReferTo() {
        return referTo;
    }
    public void setReferTo(String referTo) {
        this.referTo = referTo;
    }
    @XmlTransient
    public String getReferField() {
        return referField;
    }
    public void setReferField(String referField) {
        this.referField = referField;
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
    public int getFieldOrder() {
        return fieldOrder;
    }
    
    public void setFieldOrder(int fieldOrder) {
        this.fieldOrder = fieldOrder;
    }

    @XmlTransient
    public int getWidth() {
        return width;
    }
    
    public void setWidth(int width) {
        this.width = width;
    }

    @XmlTransient
    public String getAlign() {
        return align;
    }
    public void setAlign(String align) {
        this.align = align;
    }
    
    @XmlTransient
    public String getColumnField() {
        return columnField;
    }
    public void setColumnField(String columnField) {
        this.columnField = columnField;
    }
}
