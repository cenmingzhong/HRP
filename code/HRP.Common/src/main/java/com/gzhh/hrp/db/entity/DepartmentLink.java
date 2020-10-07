package com.gzhh.hrp.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.entity.BaseEntity;
@Entity
@Table(name="DB_Department_Link")
public class DepartmentLink extends BaseEntity{
    
    @Id
    @Column(name="Id")    
    private String id;

    @Column(name="Dept_Code")    
    private String deptCode;

    @Column(name="Link_Name")    
    private String linkName;

    @Column(name="Link_Psn")    
    private String linkPsn;

    @Column(name="Link_Phone")    
    private String linkPhone;

    @Column(name="Link_Address")    
    private String linkAddress;

    
    /*获取*/
    public String getId() {
        return this.id;
    }
        
    /*设置*/
    public void setId(String id){
        this.id = id;
    }
        
    /*获取*/
    public String getDeptCode() {
        return this.deptCode;
    }
        
    /*设置*/
    public void setDeptCode(String deptCode){
        this.deptCode = deptCode;
    }
        
    /*获取*/
    public String getLinkName() {
        return this.linkName;
    }
        
    /*设置*/
    public void setLinkName(String linkName){
        this.linkName = linkName;
    }
        
    /*获取*/
    public String getLinkPsn() {
        return this.linkPsn;
    }
        
    /*设置*/
    public void setLinkPsn(String linkPsn){
        this.linkPsn = linkPsn;
    }
        
    /*获取*/
    public String getLinkPhone() {
        return this.linkPhone;
    }
        
    /*设置*/
    public void setLinkPhone(String linkPhone){
        this.linkPhone = linkPhone;
    }
        
    /*获取*/
    public String getLinkAddress() {
        return this.linkAddress;
    }
        
    /*设置*/
    public void setLinkAddress(String linkAddress){
        this.linkAddress = linkAddress;
    }
    
}