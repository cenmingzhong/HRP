package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Sys_Operation_Auth")
public class OperationAuth extends BaseEntity{
    @Id
    @Column(name="Id") 
    public String id ; 
    
    @Column(name="sys_Role_Code") 
    public String sysRoleCode ;
    
    @Column(name="Oper_Id") 
    public String operId ;
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSysRoleCode() {
        return sysRoleCode;
    }

    public void setSysRoleCode(String sysRoleCode) {
        this.sysRoleCode = sysRoleCode;
    }

    public String getOperId() {
        return operId;
    }

    public void setOperId(String operId) {
        this.operId = operId;
    }
}
