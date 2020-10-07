package com.gzhh.hrp.common.service;

import java.util.HashMap;

import com.gzhh.hrp.common.entity.VouchTableField;
import com.gzhh.hrp.tools.ResultView;

public interface VouchTableFieldService {

    public ResultView save(VouchTableField vouchTableField);
    public ResultView getList(HashMap<String, Object> params);
    public ResultView getInfo(String id);
    public ResultView delete(String id);

    
}