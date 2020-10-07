package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;

@Entity
@Table(name="Sys_Print_Template_Class")
@Title("打印模板分类")
public class PrintTemplateClass extends BaseEntity{
    
    @Id
    @Column(name="Template_Cls_Code")
    @Title("打印模板分类编码")
    private String templateClsCode;

    @Column(name="Template_Cls_Name") 
    @Title("打印模板分类名称")
    private String templateClsName;

    @Column(name="Vouch_Table_Id")
    @Title("单据表格编号")
    private String vouchTableId;

    @Column(name="Is_System")
    @Title("是否系统模板")
    private Boolean isSystem;

    
    /*获取*/
    public String getTemplateClsCode() {
        return this.templateClsCode;
    }
        
    /*设置*/
    public void setTemplateClsCode(String templateClsCode){
        this.templateClsCode = templateClsCode;
    }
        
    /*获取*/
    public String getTemplateClsName() {
        return this.templateClsName;
    }
        
    /*设置*/
    public void setTemplateClsName(String templateClsName){
        this.templateClsName = templateClsName;
    }
        
    /*获取*/
    public String getVouchTableId() {
        return this.vouchTableId;
    }
        
    /*设置*/
    public void setVouchTableId(String vouchTableId){
        this.vouchTableId = vouchTableId;
    }
        
    /*获取*/
    public Boolean getIsSystem() {
        return this.isSystem;
    }
        
    /*设置*/
    public void setIsSystem(Boolean isSystem){
        this.isSystem = isSystem;
    }
    
}
