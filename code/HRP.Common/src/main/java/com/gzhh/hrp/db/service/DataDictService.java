package com.gzhh.hrp.db.service;

import java.util.HashMap;

import com.gzhh.hrp.db.entity.DataDict;
import com.gzhh.hrp.db.entity.DataDictDetail;
import com.gzhh.hrp.tools.ResultView;

public interface DataDictService {
    ResultView save(DataDictDetail entity);
    ResultView getList(String dataTpyeCode);
    ResultView getInfo(String id);
    ResultView delete(String id);
    ResultView getSearchList(HashMap<String, Object> params);
    ResultView saveDictType(DataDict dataDict);
    ResultView deleteDictType(String dictTypeCode);
    ResultView getDictTypeList();
    ResultView getDictType(String dictTypeCode);
}
