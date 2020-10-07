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
@Table(name="Sys_Vouch_Head")
public class VouchHeadField {

    @Id
    @Column(name="id")
    private String id;
    
    @Column(name="vouch_Type")
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

    @Column(name="length")
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

    @XmlAttribute(name="referTo")
    @Column(name="refer_to", length=500)
    private String referTo;

    @XmlAttribute(name="referField")
    @Column(name="refer_field", length=500)
    private String referField;
    
    @XmlAttribute(name="dataType")
    @Column(name="data_type")
    private String dataType;

    @XmlElement(name="fieldHtml")
    @Column(name="field_Html", length=500)
    private String fieldHtml;
    
    @Column(name="field_order")
    private int fieldOrder;

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
        return this.text;
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
            if(StringTools.isEmpty(referTo)){
                return "<input type=\"text\" id=\"txt_"+code+"\" name=\""+code+"\"/>";
            }else{
                String inputId = "txt_"+code+"."+getReferField(referTo)[1];
                String inputName = code+"."+getReferField(referTo)[1];
                String hiddenId = "txt_"+code+"."+getReferField(referTo)[0];
                String hiddenName = code+"."+getReferField(referTo)[0];
                return "<input type=\"text\" id=\""+inputId+"\" name=\""+inputName+"\"/><input type=\"hidden\" id=\""+hiddenId+"\" name=\""+hiddenName+"\"/>";
            }
        }
        return fieldHtml;
    }
    
    private String[] getReferField(String referTo){
        switch(referTo){
            case "organ":
                return new String[]{"orgCode","orgName"};
            case "department":
                return new String[]{"deptCode","deptName"};
            case "warehouse":
                return new String[]{"whCode","whName"};
            case "person":
                return new String[]{"personCode","personName"};
            case "vendor":
                return new String[]{"venCode","venName"};
            case "rdType":
                return new String[]{"rdCode","rdName"};
            case "assetClass":
                return new String[]{"assetClsCode","assetClsName"};
            case "assetStatus":
                return new String[]{"statusCode","statusName"};
            case "assetArch":
                return new String[]{"archCode","archName"};
            case "fundSrc":
                return new String[]{"id","srcName"};
            case "assetAddOrigin":
                return new String[]{"originCode","originName"};
            case "assetDecOrigin":
                return new String[]{"originCode","originName"};
            case "budgetItem":
                return new String[]{"itemCode","itemName"};
            case "accountCode":
                return new String[]{"subjCode","subjName"};
            case "item":
                return new String[]{"id","itemName"};
            case "depreMethod":
                return new String[]{"methodCode","methodName"};
            case "accountScheme":
                return new String[]{"accountSchemeId","accountSchemeName"};
        }
        return new String[]{"",""};
    }

    public void setFieldHtml(String fieldHtml) {
        this.fieldHtml = fieldHtml;
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
    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
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
    
}
