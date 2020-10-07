package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Sys_Property_Detail")
public class SysPropertyDetail {

    @Id
    @Column(name="id",length=50)
    private String id;
    
    @Column(name="mid",length=50)
    private String mid;

    @Column(name="prop_value",length=50)
    private String propValue;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getPropValue() {
        return propValue;
    }

    public void setPropValue(String propValue) {
        this.propValue = propValue;
    }
    
}
