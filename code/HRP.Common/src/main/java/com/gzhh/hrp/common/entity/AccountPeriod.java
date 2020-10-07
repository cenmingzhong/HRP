/**
 * ===========================================================================
 * 版权所有 2017 广州市辉海计算机科技有限公司，并保留所有权利。
 * ----------------------------------------------------------------------------
 * 提示：在未取得商业授权之前，您不能将本软件应用于商业用途，否则将保留追究的权力。
 * ----------------------------------------------------------------------------
 * 创 建 者：梁海成
 * 创建日期：2017-06-12 03:57:57
 * ----------------------------------------------------------------------------
 * 修改人       修改日期        修改内容
 * ===========================================================================
 *
*/
package com.gzhh.hrp.common.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="Sys_Account_Period")
public class AccountPeriod extends BaseEntity{
    
    @Id
    @Column(name="Id")
    private String id;

    @Column(name="Org_Code")
    private String orgCode;

    @Column(name="Year")    
    private int year;

    @Column(name="Month")
    private int month;

    @Column(name="Year_Month")    
    private int yearMonth;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Column(name="Begin_Date")    
    private Date beginDate;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Column(name="End_Date")    
    private Date endDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYearMonth() {
        return yearMonth;
    }

    public void setYearMonth(int yearMonth) {
        this.yearMonth = yearMonth;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}