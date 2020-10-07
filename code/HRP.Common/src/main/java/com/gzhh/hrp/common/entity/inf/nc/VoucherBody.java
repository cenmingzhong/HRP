package com.gzhh.hrp.common.entity.inf.nc;

import java.lang.reflect.Field;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlTransient;

public class VoucherBody {
    
    public VoucherBody(){
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

    //分录号，不能为空
    @XmlElement(name="entry_id")
    public String entryId;

    //科目， 不能为空
    @XmlElement(name="account_code")
    private String accountCode;

    //摘要，不能为空
    @XmlElement(name="abstract")
    private String digest;
     
    //结算方式，可以为空
    @XmlElement(name="settlement")
    private String settlement;
     
    //票据号，可以为空
    @XmlElement(name="document_id")
    private String documentId;
    
    //票据日期，可以为空
    @XmlElement(name="document_date")
    private String documentDate;
      
    //币种，不能为空
    @XmlElement(name="currency")
    private String currency;
     
    //单价，可以为空
    @XmlElement(name="unit_price")
    private String unitPrice;
     
    //汇率1，主辅币核算时使用，折辅汇率，可以为空
    @XmlElement(name="exchange_rate1")
    private String exchangerate1;
    
    //汇率2，折本汇率，可以为空
    @XmlElement(name="exchange_rate2")
    private String exchangerate2;
     
    //借方数量，可以为空
    @XmlElement(name="debit_quantity")
    private String debitQuantity;
     
    //原币借方发生额，不能为空
    @XmlElement(name="primary_debit_amount")
    private String primaryDebitAmount;
     
    //辅币借方发生额，可以为空
    @XmlElement(name="secondary_debit_amount")
    private String secondaryDebitAmount;
     
    //本币借方发生额，不能为空
    @XmlElement(name="natural_debit_currency")
    private String naturalDebitCurrency;
     
    //贷方数量，可以为空
    @XmlElement(name="credit_quantity")
    private String creditQuantity;
    
    //原币贷方发生额，不能为空
    @XmlElement(name="primary_credit_amount")
    private String primaryCreditAmount;
     
    //辅币贷方发生额，可以为空
    @XmlElement(name="secondary_credit_amount")
    private String secondaryCreditAmount;
    
    //本币贷方发生额，不能为空
    @XmlElement(name="natural_credit_currency")
    private String naturalCreditCurrency;
     
     //原始单据类型，可以为空
    @XmlElement(name="bill_type")
    private String billType;
     
    //原始单据编号， 可以为空
    @XmlElement(name="bill_id")
    private String billId;
     
    //原始单据日期，可以为空
    @XmlElement(name="bill_date")
    private String billDate;
    
    @XmlElementWrapper(name="auxiliary_accounting")
    @XmlElement(name="item")
    private List<SubjFreeValue> freeValueList;
    
    @XmlTransient
    public String getEntryId() {
        return entryId;
    }

    public void setEntryId(String entryId) {
        this.entryId = entryId;
    }

    @XmlTransient
    public String getAccountCode() {
        return accountCode;
    }

    public void setAccountCode(String accountCode) {
        this.accountCode = accountCode;
    }

    @XmlTransient
    public String getDigest() {
        return digest;
    }

    public void setDigest(String digest) {
        this.digest = digest;
    }

    @XmlTransient
    public String getSettlement() {
        return settlement;
    }

    public void setSettlement(String settlement) {
        this.settlement = settlement;
    }

    @XmlTransient
    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    @XmlTransient
    public String getDocumentDate() {
        return documentDate;
    }

    public void setDocumentDate(String documentDate) {
        this.documentDate = documentDate;
    }

    @XmlTransient
    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    @XmlTransient
    public String getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(String unitPrice) {
        this.unitPrice = unitPrice;
    }

    @XmlTransient
    public String getExchangerate1() {
        return exchangerate1;
    }

    public void setExchangerate1(String exchangerate1) {
        this.exchangerate1 = exchangerate1;
    }

    @XmlTransient
    public String getExchangerate2() {
        return exchangerate2;
    }

    public void setExchangerate2(String exchangerate2) {
        this.exchangerate2 = exchangerate2;
    }

    @XmlTransient
    public String getDebitQuantity() {
        return debitQuantity;
    }

    public void setDebitQuantity(String debitQuantity) {
        this.debitQuantity = debitQuantity;
    }

    @XmlTransient
    public String getPrimaryDebitAmount() {
        return primaryDebitAmount;
    }

    public void setPrimaryDebitAmount(String primaryDebitAmount) {
        this.primaryDebitAmount = primaryDebitAmount;
    }

    @XmlTransient
    public String getSecondaryDebitAmount() {
        return secondaryDebitAmount;
    }

    public void setSecondaryDebitAmount(String secondaryDebitAmount) {
        this.secondaryDebitAmount = secondaryDebitAmount;
    }

    @XmlTransient
    public String getNaturalDebitCurrency() {
        return naturalDebitCurrency;
    }

    public void setNaturalDebitCurrency(String naturalDebitCurrency) {
        this.naturalDebitCurrency = naturalDebitCurrency;
    }

    @XmlTransient
    public String getCreditQuantity() {
        return creditQuantity;
    }

    public void setCreditQuantity(String creditQuantity) {
        this.creditQuantity = creditQuantity;
    }

    @XmlTransient
    public String getPrimaryCreditAmount() {
        return primaryCreditAmount;
    }

    public void setPrimaryCreditAmount(String primaryCreditAmount) {
        this.primaryCreditAmount = primaryCreditAmount;
    }

    @XmlTransient
    public String getSecondaryCreditAmount() {
        return secondaryCreditAmount;
    }

    public void setSecondaryCreditAmount(String secondaryCreditAmount) {
        this.secondaryCreditAmount = secondaryCreditAmount;
    }

    @XmlTransient
    public String getNaturalCreditCurrency() {
        return naturalCreditCurrency;
    }

    public void setNaturalCreditCurrency(String naturalCreditCurrency) {
        this.naturalCreditCurrency = naturalCreditCurrency;
    }

    @XmlTransient
    public String getBillType() {
        return billType;
    }

    public void setBillType(String billType) {
        this.billType = billType;
    }

    @XmlTransient
    public String getBillId() {
        return billId;
    }

    public void setBillId(String billId) {
        this.billId = billId;
    }

    @XmlTransient
    public String getBillDate() {
        return billDate;
    }

    public void setBillDate(String billDate) {
        this.billDate = billDate;
    }

    @XmlTransient
    public List<SubjFreeValue> getFreeValueList() {
        return freeValueList;
    }

    public void setFreeValueList(List<SubjFreeValue> freeValueList) {
        this.freeValueList = freeValueList;
    }
}
