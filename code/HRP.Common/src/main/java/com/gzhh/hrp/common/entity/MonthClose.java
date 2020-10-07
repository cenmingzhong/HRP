/**
 * ===========================================================================
 * 版权所有 2017 广州市辉海计算机科技有限公司，并保留所有权利。
 * ----------------------------------------------------------------------------
 * 提示：在未取得商业授权之前，您不能将本软件应用于商业用途，否则将保留追究的权力。
 * ----------------------------------------------------------------------------
 * 创 建 者：梁海成
 * 创建日期：2017-06-12 04:55:27
 * ----------------------------------------------------------------------------
 * 修改人       修改日期        修改内容
 * ===========================================================================
 *
*/
package com.gzhh.hrp.common.entity;

import javax.persistence.Entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Id;
import org.apache.ibatis.type.Alias;
import javax.persistence.Table;

import com.gzhh.hrp.common.entity.BaseEntity;


@Entity
@Table(name="Sys_Month_Close")
@Alias("MonthClose")
public class MonthClose extends BaseEntity{
    
    @Id
    @Column(name="Id")    
    private String id;

    @Column(name="Org_Code")    
    private String orgCode;

    @Column(name="App_Key")    
    private String appKey;

    @Column(name="Vouch_Prop")    
    private String vouchProp;

    @Column(name="Year")    
    private Integer year;

    @Column(name="Month")    
    private Integer month;

    @Column(name="Year_Month")    
    private Integer yearMonth;

    @Column(name="Is_Close")    
    private Boolean isClose;

    @Column(name="Closer")    
    private String closer;

    @Column(name="Close_Time")    
    private Date closeTime;

    
    /*获取*/
    public String getId() {
        return this.id;
    }
        
    /*设置*/
    public void setId(String id){
        this.id = id;
    }
        
    /*获取*/
    public String getOrgCode() {
        return this.orgCode;
    }
        
    /*设置*/
    public void setOrgCode(String orgCode){
        this.orgCode = orgCode;
    }
        
    /*获取*/
    public String getAppKey() {
        return this.appKey;
    }
        
    /*设置*/
    public void setAppKey(String appKey){
        this.appKey = appKey;
    }
        
    /*获取*/
    public String getVouchProp() {
        return this.vouchProp;
    }
        
    /*设置*/
    public void setVouchProp(String vouchProp){
        this.vouchProp = vouchProp;
    }
        
    /*获取*/
    public Integer getYear() {
        return this.year;
    }
        
    /*设置*/
    public void setYear(Integer year){
        this.year = year;
    }
        
    /*获取*/
    public Integer getMonth() {
        return this.month;
    }
        
    /*设置*/
    public void setMonth(Integer month){
        this.month = month;
    }
        
    /*获取*/
    public Integer getYearMonth() {
        return this.yearMonth;
    }
        
    /*设置*/
    public void setYearMonth(Integer yearMonth){
        this.yearMonth = yearMonth;
    }
        
    /*获取*/
    public Boolean getIsClose() {
        return this.isClose;
    }
        
    /*设置*/
    public void setIsClose(Boolean isClose){
        this.isClose = isClose;
    }
        
    /*获取*/
    public String getCloser() {
        return this.closer;
    }
        
    /*设置*/
    public void setCloser(String closer){
        this.closer = closer;
    }
        
    /*获取*/
    public Date getCloseTime() {
        return this.closeTime;
    }
        
    /*设置*/
    public void setCloseTime(Date closeTime){
        this.closeTime = closeTime;
    }
    
}