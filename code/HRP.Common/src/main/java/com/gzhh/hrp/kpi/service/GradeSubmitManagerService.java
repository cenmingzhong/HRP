package com.gzhh.hrp.kpi.service;

import com.alibaba.fastjson.JSONObject;
import com.gzhh.hrp.tools.ResultView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cenmingzhong
 * @create 2020-10-19-下午 14:31
 */
public interface GradeSubmitManagerService {


    public ResultView getSubmitHeadList(HashMap<String, Object> filters);

    public ResultView getSubmitTailList(String submitNumber);


    public ResultView save(HashMap map);
}
