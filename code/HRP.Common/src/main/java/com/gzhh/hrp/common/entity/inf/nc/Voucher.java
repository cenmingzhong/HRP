package com.gzhh.hrp.common.entity.inf.nc;

import java.util.List;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlTransient;

public class Voucher {

    @XmlAttribute(name="id")
    private String id;
    
    @XmlElement(name="voucher_head")
    private VoucherHead voucherHead;
    
    @XmlElementWrapper(name="voucher_body")
    @XmlElement(name="entry")
    private List<VoucherBody>voucherBodyList;

    @XmlTransient
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @XmlTransient
    public VoucherHead getVoucherHead() {
        return voucherHead;
    }

    public void setVoucherHead(VoucherHead voucherHead) {
        this.voucherHead = voucherHead;
    }

    @XmlTransient
    public List<VoucherBody> getVoucherBodyList() {
        return voucherBodyList;
    }

    public void setVoucherBodyList(List<VoucherBody> voucherBodyList) {
        this.voucherBodyList = voucherBodyList;
    }
    
}
