package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Sys_Property")
public class SysProperty extends BaseEntity{

    @Id
    @Column(name="Id",length=50)
    private String id;
    
    @Column(name="App_Key",length=50)
    private String appKey;
    
    @Column(name="Prop_Name",length=50)
    private String propName;
    
    @Column(name="Prop_Caption",length=200)
    private String propCaption;
    
    @Column(name="Prop_Type",length=50)
    private String propType;
    
    @Column(name="Prop_Value",length=100)
    private String propValue;
    
    @Column(name="Default_Value",length=100)
    private String defaultValue;

    @Column(name="Prop_visible")
    private Boolean propVisible;

    @Column(name="Prop_enable")
    private Boolean propEnable;
    
    @Column(name="Hospital_Name",length=100)
    private String hospitalName;
    
    @Column(name="acoount_id",length=100)
    private String acoountId;
    
    @Column(name="year",length=100)
    private Integer year;
    
    @Column(name="item_class",length=100)
    private String itemClass;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAppKey() {
        return appKey;
    }

    public void setAppKey(String appKey) {
        this.appKey = appKey;
    }

    public String getPropName() {
        return propName;
    }

    public void setPropName(String propName) {
        this.propName = propName;
    }

    public String getPropCaption() {
        return propCaption;
    }

    public void setPropCaption(String propCaption) {
        this.propCaption = propCaption;
    }

    public String getPropType() {
        return propType;
    }

    public void setPropType(String propType) {
        this.propType = propType;
    }

    public String getPropValue() {
        return propValue;
    }

    public void setPropValue(String propValue) {
        this.propValue = propValue;
    }

    public String getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    public Boolean getPropVisible() {
        return propVisible;
    }

    public void setPropVisible(Boolean propVisible) {
        this.propVisible = propVisible;
    }

    public Boolean getPropEnable() {
        return propEnable;
    }

    public void setPropEnable(Boolean propEnable) {
        this.propEnable = propEnable;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

	public String getAcoountId() {
		return acoountId;
	}

	public void setAcoountId(String acoountId) {
		this.acoountId = acoountId;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getItemClass() {
		return itemClass;
	}

	public void setItemClass(String itemClass) {
		this.itemClass = itemClass;
	}
    
}
