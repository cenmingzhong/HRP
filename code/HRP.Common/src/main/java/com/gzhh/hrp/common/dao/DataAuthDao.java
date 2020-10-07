package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.DataAuth;

@Repository
@SuppressWarnings("rawtypes")
public class DataAuthDao extends BaseDao<DataAuth> {
    public List<Map> getRoleAuthList(HashMap<String, Object> params){
        return getMapList("SYS_DataAuth.getRoleAuthList", params);
    }

    public int clearDataAuth(HashMap<String, Object> params){
        return delete("SYS_DataAuth.clearDataAuth", params);
    }

	public Integer getDataAuthListByUser(String sysRoleCode) {
		return (Integer)getObject("SYS_DataAuth.getDataAuthListByUser", sysRoleCode);
	}

	public Integer getDataAuthListByFile(String sysRoleCode) {
		return (Integer)getObject("SYS_DataAuth.getDataAuthListByFile", sysRoleCode);
	}
}
