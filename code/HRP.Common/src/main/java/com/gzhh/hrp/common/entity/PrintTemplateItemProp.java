package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;

@Entity
@Table(name="Sys_Print_Template_Item_Prop")
@Title("系统打印模板条款属性")
public class PrintTemplateItemProp extends BaseEntity{
    
    @Id
    @Column(name="Prop_Id")
    @Title("系统打印模板条款属性编号")
    private String propId;

    @Column(name="Item_Id") 
    @Title("系统打印模板条款编号")
    private String itemId;

    @Column(name="Template_Code") 
    @Title("打印模板编号")
    private String templateCode;

    @Column(name="Prop_Type")
    @Title("系统打印模板条款属性类型")
    private String propType;

    @Column(name="Prop_Name")
    @Title("系统打印模板条款属性名称")
    private String propName;

    @Column(name="Prop_Value") 
    @Title("系统打印模板条款属性值")
    private String propValue;

    
    /*获取*/
    public String getPropId() {
        return this.propId;
    }
        
    /*设置*/
    public void setPropId(String propId){
        this.propId = propId;
    }
        
    /*获取*/
    public String getItemId() {
        return this.itemId;
    }
        
    /*设置*/
    public void setItemId(String itemId){
        this.itemId = itemId;
    }
        
    /*获取*/
    public String getTemplateCode() {
        return this.templateCode;
    }
        
    /*设置*/
    public void setTemplateCode(String templateCode){
        this.templateCode = templateCode;
    }
        
    /*获取*/
    public String getPropType() {
        return this.propType;
    }
        
    /*设置*/
    public void setPropType(String propType){
        this.propType = propType;
    }
        
    /*获取*/
    public String getPropName() {
        return this.propName;
    }
        
    /*设置*/
    public void setPropName(String propName){
        this.propName = propName;
    }
        
    /*获取*/
    public String getPropValue() {
        return this.propValue;
    }
        
    /*设置*/
    public void setPropValue(String propValue){
        this.propValue = propValue;
    }
    
}
