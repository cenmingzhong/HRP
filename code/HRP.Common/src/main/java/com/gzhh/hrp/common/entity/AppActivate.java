/**
 * ===========================================================================
 * 版权所有 2017 广州市辉海计算机科技有限公司，并保留所有权利。
 * ----------------------------------------------------------------------------
 * 提示：在未取得商业授权之前，您不能将本软件应用于商业用途，否则将保留追究的权力。
 * ----------------------------------------------------------------------------
 * 创 建 者：梁海成
 * 创建日期：2017-07-14 08:43:53
 * ----------------------------------------------------------------------------
 * 修改人       修改日期        修改内容
 * ===========================================================================
 *
*/
package com.gzhh.hrp.common.entity;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.Id;
import org.apache.ibatis.type.Alias;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlTransient;

import com.gzhh.hrp.common.entity.BaseEntity;


@Entity
@Table(name="Sys_App_Activate")
@Alias("AppActivate")
public class AppActivate extends BaseEntity{
    
    @Id
    @Column(name="App_Key")
    @XmlAttribute(name="appKey")
    private String appKey;

    @Column(name="App_Name")    
    @XmlAttribute(name="appName")
    private String appName;

    @Column(name="Is_Activate")    
    private boolean isActivate;

    @Column(name="Activate_Period")    
    private Integer activatePeriod;

    
    /*获取*/
    @XmlTransient
    public String getAppKey() {
        return this.appKey;
    }
        
    /*设置*/
    public void setAppKey(String appKey){
        this.appKey = appKey;
    }
        
    /*获取*/
    @XmlTransient
    public String getAppName() {
        return this.appName;
    }
        
    /*设置*/
    public void setAppName(String appName){
        this.appName = appName;
    }
        
    /*获取*/
    public boolean getIsActivate() {
        return this.isActivate;
    }
        
    /*设置*/
    public void setIsActivate(boolean isActivate){
        this.isActivate = isActivate;
    }
        
    /*获取*/
    public Integer getActivatePeriod() {
        return this.activatePeriod;
    }
        
    /*设置*/
    public void setActivatePeriod(Integer activatePeriod){
        this.activatePeriod = activatePeriod;
    }
    
}