package com.gzhh.hrp.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;
@Entity
@Table(name="DB_Data_Dict")
public class DataDict extends BaseEntity {

    @Id
    @Column(name="Dict_Type_Code",length=50)
    @Title("数据类型编码")
    private String dictTypeCode;
    
    @Column(name="Dict_Type_Name",length=50)
    @Title("数据类型名字")
    private String dictTypeName;
    
    public String getDictTypeCode() {
        return dictTypeCode;
    }

    public void setDictTypeCode(String dictTypeCode) {
        this.dictTypeCode = dictTypeCode;
    }

    public String getDictTypeName() {
        return dictTypeName;
    }

    public void setDictTypeName(String dictTypeName) {
        this.dictTypeName = dictTypeName;
    }

    
}
