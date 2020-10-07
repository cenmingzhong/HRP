package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;

@Entity
@Table(name="Sys_Print_Template_Item")
@Title("系统打印模板条款")
public class PrintTemplateItem extends BaseEntity{
    
    @Id
    @Column(name="Item_Id")
    @Title("系统打印模板条款编号")
    private String itemId;

    @Column(name="Component_Id")
    @Title("打印模板要素编号")
    private String componentId;

    @Column(name="Template_Code") 
    @Title("打印模板编码")
    private String templateCode;

    @Column(name="Item_Type") 
    @Title("系统打印模板条款类型")
    private String itemType;

    @Column(name="Item_Order")
    @Title("系统打印模板条款顺序")
    private Integer itemOrder;

    
    /*获取*/
    public String getItemId() {
        return this.itemId;
    }
        
    /*设置*/
    public void setItemId(String itemId){
        this.itemId = itemId;
    }
        
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
    public String getItemType() {
        return this.itemType;
    }
        
    /*设置*/
    public void setItemType(String itemType){
        this.itemType = itemType;
    }
        
    /*获取*/
    public Integer getItemOrder() {
        return this.itemOrder;
    }
        
    /*设置*/
    public void setItemOrder(Integer itemOrder){
        this.itemOrder = itemOrder;
    }
    
}