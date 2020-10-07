package com.gzhh.hrp.common.service;

import java.util.HashMap;

import com.gzhh.hrp.common.entity.SysProperty;
import com.gzhh.hrp.tools.ResultView;

public interface SysPropertyService {

    public ResultView save(HashMap<String, Object> sysPropList, HashMap<String, Object> sysPropDetailList, String appKey);
    public ResultView getPropertyList(String appKey);
    public ResultView getAppSetting();
    public SysProperty getSysProperty(String appKey, String propName);
   
}
