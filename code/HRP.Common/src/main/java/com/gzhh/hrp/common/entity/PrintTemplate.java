package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;

@Entity
@Table(name="Sys_Print_Template")
@Title("打印模板")
public class PrintTemplate extends BaseEntity{
    
    @Id
    @Column(name="Template_Code")  
    @Title("模板编码")
    private String templateCode;
    
    @Column(name="Template_Cls_Code")
    @Title("模板分类编码")
    private String templateClsCode;
    
    @Column(name="Template_Name")
    @Title("模板名称")
    private String templateName;

    @Column(name="Is_Default") 
    @Title("是否默认模板")
    private boolean isDefault;
    
    /*获取*/
    public String getTemplateCode() {
        return this.templateCode;
    }
        
    /*设置*/
    public void setTemplateCode(String templateCode){
        this.templateCode = templateCode;
    }
        
    /*获取*/
    public String getTemplateClsCode() {
        return this.templateClsCode;
    }
        
    /*设置*/
    public void setTemplateClsCode(String templateClsCode){
        this.templateClsCode = templateClsCode;
    }
        
    /*获取*/
    public String getTemplateName() {
        return this.templateName;
    }
        
    /*设置*/
    public void setTemplateName(String templateName){
        this.templateName = templateName;
    }
        
    /*获取*/
    public Boolean getIsDefault() {
        return this.isDefault;
    }
        
    /*设置*/
    public void setIsDefault(Boolean isDefault){
        this.isDefault = isDefault;
    }
    
}
