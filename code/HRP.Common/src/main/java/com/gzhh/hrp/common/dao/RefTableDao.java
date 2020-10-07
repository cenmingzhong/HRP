package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public class RefTableDao extends BaseDao<Object>{

    @SuppressWarnings("rawtypes")
	public String getIdByType(HashMap<String, Object> params){
        List<Map> list = getMapList("Sys_RefTable.getIdByType", params);
        if(list.size()>0){
            Map map = list.get(0);
            for(Object v : map.values()){
                return String.valueOf(v);
            }
        }
        return null;
    }
    
    public String getColMaxValue(HashMap<String, Object> params){
        return (String)getObject("Sys_RefTable.getColMaxValue", params);
    }
}
