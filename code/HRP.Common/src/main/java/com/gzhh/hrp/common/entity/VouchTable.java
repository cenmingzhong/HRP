/**
 * ===========================================================================
 * 版权所有 2017 广州市辉海计算机科技有限公司，并保留所有权利。
 * ----------------------------------------------------------------------------
 * 提示：在未取得商业授权之前，您不能将本软件应用于商业用途，否则将保留追究的权力。
 * ----------------------------------------------------------------------------
 * 创 建 者：omo
 * 创建日期：2017-06-08 02:04:43
 * ----------------------------------------------------------------------------
 * 修改人       修改日期        修改内容
 * ===========================================================================
 *
*/
package com.gzhh.hrp.common.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlTransient;

import com.gzhh.hrp.common.Title;


@Entity
@Table(name="Sys_Vouch_Table")
@Title("单据")
public class VouchTable extends BaseEntity{
    
    @Id
    @Column(name="Vouch_Id") 
    @Title("单据ID")
    @XmlAttribute(name="vouchId")
    private String vouchId;
    
    @Title("单据编号")
    @Column(name="Vouch_Code")
    @XmlAttribute(name="vouchCode")
    private String vouchCode;

    @Column(name="Vouch_Name")
    @Title("单据名称")
    @XmlAttribute(name="vouchName")
    private String vouchName;

    @Column(name="Is_System")
    @Title(" 是否系统单据")
    @XmlAttribute(name="isSystem")
    private Boolean isSystem;

    @Column(name="Vouch_Memo")
    @Title("单据描述")
    private String vouchMemo;

    
    /*获取*/
    @XmlTransient
    public String getVouchId() {
        return this.vouchId;
    }
        
    /*设置*/
    public void setVouchId(String vouchId){
        this.vouchId = vouchId;
    }
        
    /*获取*/
    @XmlTransient
    public String getVouchCode() {
        return this.vouchCode;
    }
        
    /*设置*/
    public void setVouchCode(String vouchCode){
        this.vouchCode = vouchCode;
    }
        
    /*获取*/
    @XmlTransient
    public String getVouchName() {
        return this.vouchName;
    }
        
    /*设置*/
    public void setVouchName(String vouchName){
        this.vouchName = vouchName;
    }
        
    /*获取*/
    @XmlTransient
    public Boolean getIsSystem() {
        return this.isSystem;
    }
        
    /*设置*/
    public void setIsSystem(Boolean isSystem){
        this.isSystem = isSystem;
    }
        
    /*获取*/
    @XmlTransient
    public String getVouchMemo() {
        return this.vouchMemo;
    }
        
    /*设置*/
    public void setVouchMemo(String vouchMemo){
        this.vouchMemo = vouchMemo;
    }
    
}