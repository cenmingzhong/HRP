/**
 * ===========================================================================
 * 版权所有 2017 广州市辉海计算机科技有限公司，并保留所有权利。
 * ----------------------------------------------------------------------------
 * 提示：在未取得商业授权之前，您不能将本软件应用于商业用途，否则将保留追究的权力。
 * ----------------------------------------------------------------------------
 * 创 建 者：omo
 * 创建日期：2017-06-08 02:04:43
 * ----------------------------------------------------------------------------
 * 修改人       修改日期        修改内容
 * ===========================================================================
 *
*/
package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlTransient;

import com.gzhh.hrp.common.Title;


@Entity
@Table(name="Sys_Vouch_Table_Field")
@Title("单据字段")
public class VouchTableField extends BaseEntity{
    
    @Id
    @Column(name="id") 
    @Title("表单ID")
    @XmlAttribute(name="id")
    private String id;

    @Column(name="Vouch_Id") 
    @Title("单据ID")
    @XmlAttribute(name="vouchId")
    private String vouchId;
    
    @Title("单据表头")
    @Column(name="Head_Body")    
    @XmlAttribute(name="headBody")
    private String headBody;

    @Column(name="Field_Code")
    @Title("字段编码")
    @XmlAttribute(name="fieldCode")
    private String fieldCode;

    @Column(name="Field_Name") 
    @Title("字段名称")
    @XmlAttribute(name="fieldName")
    private String fieldName;

    @Column(name="Field_Text") 
    @Title("字段标题")
    @XmlAttribute(name="fieldText")
    private String fieldText;

    @Column(name="Field_Order") 
    @Title("字段顺序")
    @XmlAttribute(name="fieldOrder")
    private Integer fieldOrder;

    
    /*获取*/
    @XmlTransient
    public String getId() {
        return this.id;
    }
        
    /*设置*/
    public void setId(String id){
        this.id = id;
    }
        
    /*获取*/
    @XmlTransient
    public String getVouchId() {
        return this.vouchId;
    }
        
    /*设置*/
    public void setVouchId(String vouchId){
        this.vouchId = vouchId;
    }
        
    /*获取*/
    @XmlTransient
    public String getHeadBody() {
        return this.headBody;
    }
        
    /*设置*/
    public void setHeadBody(String headBody){
        this.headBody = headBody;
    }
        
    /*获取*/
    @XmlTransient
    public String getFieldCode() {
        return this.fieldCode;
    }
        
    /*设置*/
    public void setFieldCode(String fieldCode){
        this.fieldCode = fieldCode;
    }
        
    /*获取*/
    @XmlTransient
    public String getFieldName() {
        return this.fieldName;
    }
        
    /*设置*/
    public void setFieldName(String fieldName){
        this.fieldName = fieldName;
    }
        
    /*获取*/
    @XmlTransient
    public String getFieldText() {
        return this.fieldText;
    }
        
    /*设置*/
    public void setFieldText(String fieldText){
        this.fieldText = fieldText;
    }
        
    /*获取*/
    @XmlTransient
    public Integer getFieldOrder() {
        return this.fieldOrder;
    }
        
    /*设置*/
    public void setFieldOrder(Integer fieldOrder){
        this.fieldOrder = fieldOrder;
    }
    
}