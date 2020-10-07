package com.gzhh.hrp.common.entity.inf.nc;

import java.lang.reflect.Field;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

public class VoucherHead {

    public VoucherHead(){
        for(Field field: this.getClass().getDeclaredFields()){
            if(field.getType()==String.class){
                try {
                    field.set(this, "");
                } catch (IllegalArgumentException | IllegalAccessException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }
    }
    
    //公司主键 ，不能为空，需要参照基础数据(公司目录)
    @XmlElement(name="company")
    private String company;
    
    //凭证类别，不能为空，需要参照基础数据(凭证类别)
    @XmlElement(name="voucher_type")
    private String voucherType;
     
    //会计年度，不能为空
    @XmlElement(name="fiscal_year")
    private String fiscalYear;
     
    //会计期间，不能为空
    @XmlElement(name="accounting_period")
    private String accountingPeriod;
    
    //凭证号，不能为空
    @XmlElement(name="voucher_id")
    private String voucherId;
     
    //附单据数，不能为空
    @XmlElement(name="attachment_number")
    private String attachmentNumber;
      
    //制单日期，不能为空
    @XmlElement(name="prepareddate")
    private String perparedDate;
     
    //制单人，不能为空
    @XmlElement(name="enter")
    private String enter;
     
    //出纳，可以为空
    @XmlElement(name="cashier")
    private String cashier;
     
    //是否已签字，不能为空，默认为N
    @XmlElement(name="signature")
    private String signature;
     
    //审核人，可以为空
    @XmlElement(name="checker")
    private String checker;
     
    //记账日期，可以为空
    @XmlElement(name="posting_date")
    private String postingDate;
    
    //记账人，可以为空
    @XmlElement(name="posting_person")
    private String postingPerson;
     
    //来源系统，不能为空
    @XmlElement(name="voucher_making_system")
    private String voucherMakingSystem;

    //备注1
    @XmlElement(name="memo1")
    private String memo1;
    
    //备注2
    @XmlElement(name="memo2")
    private String memo2;
     
    //保留项1，可以为空
    @XmlElement(name="reserve1")
    private String reserve1;
     
    //保留项2，可以为空
    @XmlElement(name="reserve2")
    private String reserve2;

    @XmlTransient
    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    @XmlTransient
    public String getVoucherType() {
        return voucherType;
    }

    public void setVoucherType(String voucherType) {
        this.voucherType = voucherType;
    }

    @XmlTransient
    public String getFiscalYear() {
        return fiscalYear;
    }

    public void setFiscalYear(String fiscalYear) {
        this.fiscalYear = fiscalYear;
    }

    @XmlTransient
    public String getAccountingPeriod() {
        return accountingPeriod;
    }

    public void setAccountingPeriod(String accountingPeriod) {
        this.accountingPeriod = accountingPeriod;
    }

    @XmlTransient
    public String getVoucherId() {
        return voucherId;
    }

    public void setVoucherId(String voucherId) {
        this.voucherId = voucherId;
    }

    @XmlTransient
    public String getAttachmentNumber() {
        return attachmentNumber;
    }

    public void setAttachmentNumber(String attachmentNumber) {
        this.attachmentNumber = attachmentNumber;
    }

    @XmlTransient
    public String getPerparedDate() {
        return perparedDate;
    }

    public void setPerparedDate(String perparedDate) {
        this.perparedDate = perparedDate;
    }

    @XmlTransient
    public String getEnter() {
        return enter;
    }

    public void setEnter(String enter) {
        this.enter = enter;
    }

    @XmlTransient
    public String getCashier() {
        return cashier;
    }

    public void setCashier(String cashier) {
        this.cashier = cashier;
    }

    @XmlTransient
    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    @XmlTransient
    public String getChecker() {
        return checker;
    }

    public void setChecker(String checker) {
        this.checker = checker;
    }

    @XmlTransient
    public String getPostingDate() {
        return postingDate;
    }

    public void setPostingDate(String postingDate) {
        this.postingDate = postingDate;
    }

    @XmlTransient
    public String getPostingPerson() {
        return postingPerson;
    }

    public void setPostingPerson(String postingPerson) {
        this.postingPerson = postingPerson;
    }

    @XmlTransient
    public String getVoucherMakingSystem() {
        return voucherMakingSystem;
    }

    public void setVoucherMakingSystem(String voucherMakingSystem) {
        this.voucherMakingSystem = voucherMakingSystem;
    }

    @XmlTransient
    public String getMemo1() {
        return memo1;
    }

    public void setMemo1(String memo1) {
        this.memo1 = memo1;
    }

    @XmlTransient
    public String getMemo2() {
        return memo2;
    }

    public void setMemo2(String memo2) {
        this.memo2 = memo2;
    }

    @XmlTransient
    public String getReserve1() {
        return reserve1;
    }

    public void setReserve1(String reserve1) {
        this.reserve1 = reserve1;
    }

    @XmlTransient
    public String getReserve2() {
        return reserve2;
    }

    public void setReserve2(String reserve2) {
        this.reserve2 = reserve2;
    }

}
