package com.gzhh.hrp.common.entity.inf.nc;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlTransient;

public class CashFlowCase {

    @XmlElement(name="money")
    private String money;

    @XmlElement(name="moneyass")
    private String moneyass;

    @XmlElement(name="moneymain")
    private String moneyMain;

    @XmlElement(name="pk_cashflow")
    private String pkCashFlow;

    @XmlTransient
    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    @XmlTransient
    public String getMoneyass() {
        return moneyass;
    }

    public void setMoneyass(String moneyass) {
        this.moneyass = moneyass;
    }

    @XmlTransient
    public String getMoneyMain() {
        return moneyMain;
    }

    public void setMoneyMain(String moneyMain) {
        this.moneyMain = moneyMain;
    }

    @XmlTransient
    public String getPkCashFlow() {
        return pkCashFlow;
    }

    public void setPkCashFlow(String pkCashFlow) {
        this.pkCashFlow = pkCashFlow;
    }
    
}
