package com.gzhh.hrp.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;

@Entity
@Table(name="DB_Code_Rule")
@Title("编码规则")
public class CodeRule extends BaseEntity{
    
    @Id
    @Column(name="Object_Key",length=50)
    @Title("编码规则主键")
    private String objectKey;
    
    @Column(name="Object_Name",length=100)
    @Title("编码规则名称")
    private String objectName;
    
    @Column(name="Object_Rule",length=20)
    @Title("编码规则")
    private String objectRule;

    public String getObjectKey() {
        return objectKey;
    }

    public void setObjectKey(String objectKey) {
        this.objectKey = objectKey;
    }

    public String getObjectName() {
        return objectName;
    }

    public void setObjectName(String objectName) {
        this.objectName = objectName;
    }

    public String getObjectRule() {
        return objectRule;
    }

    public void setObjectRule(String objectRule) {
        this.objectRule = objectRule;
    }
}
