package com.gzhh.hrp.common.entity.format;

import java.util.List;

import com.gzhh.hrp.common.entity.BaseEntity;
import com.gzhh.hrp.common.entity.VouchBodyField;
import com.gzhh.hrp.common.entity.VouchFootField;
import com.gzhh.hrp.common.entity.VouchHeadField;

public class VouchFormat extends BaseEntity {

    private String vouchType;
    private List<VouchHeadField> headList;
    private List<VouchBodyField> bodyList;
    private List<VouchFootField> footList;
    
    public String getVouchType() {
        return vouchType;
    }
    public void setVouchType(String vouchType) {
        this.vouchType = vouchType;
    }
    public List<VouchHeadField> getHeadList() {
        return headList;
    }
    public void setHeadList(List<VouchHeadField> headList) {
        this.headList = headList;
    }
    public List<VouchBodyField> getBodyList() {
        return bodyList;
    }
    public void setBodyList(List<VouchBodyField> bodyList) {
        this.bodyList = bodyList;
    }
    public List<VouchFootField> getFootList() {
        return footList;
    }
    public void setFootList(List<VouchFootField> footList) {
        this.footList = footList;
    }
}
