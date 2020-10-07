package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.ibatis.type.Alias;

import com.gzhh.hrp.common.entity.BaseEntity;

@Entity
@Table(name="Sys_Key")
@Alias("sysKey")
public class SysKey extends BaseEntity {

    @Id
    @Column(name="Key_Type")
    private String keyType;
    
    @Column(name="Key_Seq")
    private int keySeq;
    
    @Column(name="Key_Pre")
    private String keyPre;
    
    @Column(name="Key_Suf")
    private String keySuf;
    
    @Column(name="Key_Len")
    private int keyLen;
    
    @Column(name="Key_Year")
    private Integer keyYear;
    
    @Column(name="Key_Month")
    private Integer keyMonth;
    
    public String getKeyType() {
        return keyType;
    }
    public void setKeyType(String keyType) {
        this.keyType = keyType;
    }
    public int getKeySeq() {
        return keySeq;
    }
    public void setKeySeq(int keySeq) {
        this.keySeq = keySeq;
    }
    public String getKeyPre() {
        return keyPre;
    }
    public void setKeyPre(String keyPre) {
        this.keyPre = keyPre;
    }
    public String getKeySuf() {
        return keySuf;
    }
    public void setKeySuf(String keySuf) {
        this.keySuf = keySuf;
    }
    public int getKeyLen() {
        return keyLen;
    }
    public void setKeyLen(int keyLen) {
        this.keyLen = keyLen;
    }
    public Integer getKeyYear() {
        return keyYear;
    }
    public void setKeyYear(Integer keyYear) {
        this.keyYear = keyYear;
    }
    public Integer getKeyMonth() {
        return keyMonth;
    }
    public void setKeyMonth(Integer keyMonth) {
        this.keyMonth = keyMonth;
    }
}
