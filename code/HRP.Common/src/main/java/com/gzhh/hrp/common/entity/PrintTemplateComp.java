package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;

@Entity
@Table(name="Sys_Print_Template_Comp")
@Title("打印模板要素")
public class PrintTemplateComp extends BaseEntity{
    
    @Id
    @Column(name="Component_Id") 
    @Title("打印模板要素编号")
    private String componentId;

    @Column(name="Template_Code")
    @Title("打印模板编号")
    private String templateCode;

    @Column(name="Component_Type")
    @Title("打印模板要素类型")
    private String componentType;

    
    /*获取*/
    public String getComponentId() {
        return this.componentId;
    }
        
    /*设置*/
    public void setComponentId(String componentId){
        this.componentId = componentId;
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
    public String getComponentType() {
        return this.componentType;
    }
        
    /*设置*/
    public void setComponentType(String componentType){
        this.componentType = componentType;
    }
    
}
