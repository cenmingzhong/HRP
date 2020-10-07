package com.gzhh.hrp.db.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.db.entity.DataDictDetail;
@Repository
public class DataDictDetailDao extends BaseDao<DataDictDetail> {
    
    public List<DataDictDetail> getSearchList(HashMap<String, Object> params) {
        return getList("DB_DataDictDetail.getSearchList", params);
    }

}
