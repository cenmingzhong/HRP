package com.gzhh.hrp.common.entity;

import java.util.HashMap;

public class AppVouch {

    private HashMap<String, VouchGeneral> vouchList;

    public HashMap<String, VouchGeneral> getVouchList() {
        return vouchList;
    }

    public void setVouchList(HashMap<String, VouchGeneral> vouchList) {
        this.vouchList = vouchList;
    }
    
}
