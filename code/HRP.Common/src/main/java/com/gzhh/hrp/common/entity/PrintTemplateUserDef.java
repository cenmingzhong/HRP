package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.ibatis.type.Alias;

import com.gzhh.hrp.common.Title;

@Entity
@Table(name="Sys_Print_Template_User_Def")
@Alias("模板打印用户")
public class PrintTemplateUserDef extends BaseEntity{
    
    @Id
    @Column(name="Template_Code")
    @Title("模板编码")
    private String templateCode;

    @Column(name="Template_Cls_Code") 
    @Title("打印模板分类编码")
    private String templateClsCode;

    @Column(name="Template_Name")
    @Title("模板名称")
    private String templateName;

    @Column(name="User_Code")
    @Title("用户编码")
    private String userCode;

    
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
    public String getUserCode() {
        return this.userCode;
    }
        
    /*设置*/
    public void setUserCode(String userCode){
        this.userCode = userCode;
    }
    
}
