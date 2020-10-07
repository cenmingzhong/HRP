package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.Operation;
@Repository
public class OperationDao extends BaseDao<Operation>{

    public int deleteByPathUrl(String pathUrl) {
        return delete("Sys_Operation.deleteByPathUrl", pathUrl);
    }
    
    @SuppressWarnings("rawtypes")
	public List<Map> getOperationAuthList(HashMap<String, Object> filter){
        return getMapList("Sys_Operation.getOperationAuthList", filter);
    }
    
    public List<Operation> getAllOperationList(HashMap<String, Object> filter){
    	return getEntityList("Sys_Operation.getAllOperationList", filter);
    }

}
