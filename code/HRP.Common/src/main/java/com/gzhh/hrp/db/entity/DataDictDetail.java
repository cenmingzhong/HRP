package com.gzhh.hrp.db.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.gzhh.hrp.common.Title;
import com.gzhh.hrp.common.entity.BaseEntity;
@Entity
@Table(name="DB_Data_Dict_Detail")
@Title("数据字典档案")
public class DataDictDetail extends BaseEntity {
    
    @Id
    @Column(name="Id",length=50)
    private String id;
    
    @Column(name="Dict_Type_Code",length=50)
    @Title("数据类型编码")
    private String dictTypeCode;
    
    @Column(name="Dict_Code",length=50)
    @Title("数据编码")
    private String dictCode;
    
    @Column(name="Dict_Name",length=50)
    @Title("数据名称")
    private String dictName;
    
    @Column(name="Dict_State",length=50)
    @Title("数据状态")
    private String dictState;
    
    @Column(name="Creator",length=50)
    @Title("创建作者")
    private String creator;
    
    @Column(name="Create_Time")
    @Title("创建时间")
    private Date createTime;
    
    @Column(name="Editor",length=50)
    @Title("编辑作者")
    private String editor;
    
    @Column(name="Eidt_Time")
    @Title("编辑时间")
    private Date eidtTime;
    
    @Column(name="Closer")
    private String closer;
    
    @Column(name="Close_Time")
    private Date closeTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDictTypeCode() {
        return dictTypeCode;
    }

    public void setDictTypeCode(String dictTypeCode) {
        this.dictTypeCode = dictTypeCode;
    }

    public String getDictCode() {
        return dictCode;
    }

    public void setDictCode(String dictCode) {
        this.dictCode = dictCode;
    }

    public String getDictName() {
        return dictName;
    }

    public void setDictName(String dictName) {
        this.dictName = dictName;
    }

    public String getDictState() {
        return dictState;
    }

    public void setDictState(String dictState) {
        this.dictState = dictState;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getEditor() {
        return editor;
    }

    public void setEditor(String editor) {
        this.editor = editor;
    }

    public Date getEidtTime() {
        return eidtTime;
    }

    public void setEidtTime(Date eidtTime) {
        this.eidtTime = eidtTime;
    }

    public String getCloser() {
        return closer;
    }

    public void setCloser(String closer) {
        this.closer = closer;
    }

    public Date getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(Date closeTime) {
        this.closeTime = closeTime;
    }
    
    
}
