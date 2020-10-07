package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

@MappedSuperclass
public class BaseEntity {
    
    @Transient
    private boolean isNew;
    @Transient
    private boolean isUpdate;
    @Transient
    private boolean isDelete;
    
    @Column(name="ts",insertable = false, updatable = false,columnDefinition="timestamp")
    private String ts;
    
    public boolean getIsNew() {
        return isNew;
    }
    public void setIsNew(boolean isNew) {
        this.isNew = isNew;
    }
    public boolean getIsUpdate() {
        return isUpdate;
    }
    public void setIsUpdate(boolean isUpdate) {
        this.isUpdate = isUpdate;
    }
    public boolean getIsDelete() {
        return isDelete;
    }
    public void setIsDelete(boolean isDelete) {
        this.isDelete = isDelete;
    }
    public String getTs() {
        return ts;
    }
    public void setTs(String ts) {
        this.ts = ts;
    }
}
