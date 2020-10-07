package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name="Sys_Operation")
public class Operation extends BaseEntity{
    @Id
    @Column(name="Id")  
    public String id ;  
    
    @Column(name="Path_Url")    
    public String pathUrl ;
    
    @Column(name="Oper_Code")    
    public String operCode ; 
    
    @Column(name="Oper_Text")    
    public String operText ;
    
    @Transient
    public String pathName ;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPathUrl() {
        return pathUrl;
    }

    public void setPathUrl(String pathUrl) {
        this.pathUrl = pathUrl;
    }

    public String getOperCode() {
        return operCode;
    }

    public void setOperCode(String operCode) {
        this.operCode = operCode;
    }

    public String getOperText() {
        return operText;
    }

    public void setOperText(String operText) {
        this.operText = operText;
    }

	public String getPathName() {
		return pathName;
	}

	public void setPathName(String pathName) {
		this.pathName = pathName;
	}
    
    
}
