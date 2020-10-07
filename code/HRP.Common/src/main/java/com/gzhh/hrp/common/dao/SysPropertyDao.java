package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.SysProperty;
import com.gzhh.hrp.tools.CollectionTools;

@Repository
public class SysPropertyDao extends BaseDao<SysProperty>{

    public int deleteByMid(String mid){
        return delete("Sys_Property.deleteByMid", mid);
    }
    
    public List<SysProperty> getSysPropList(HashMap<String, Object> map){
        return getList("Sys_Property.getList", map);
    }
    
    public SysProperty getByPropName(String appKey, String propName){
        HashMap<String, Object> map= new HashMap<String, Object>();
        map.put("appKey", appKey);
        map.put("propName", propName);
        List<SysProperty> sysPropertyList = getList("Sys_Property.getList", map);

        if (CollectionTools.isEmpty(sysPropertyList)){
            return null;
        }
        else{
            return sysPropertyList.get(0);
        }
    }

    public void syncLockWh(String whCode, String isLock) {
        HashMap<String,Object> ht = new HashMap<String,Object>();

        ht.put("whCode", whCode);
        ht.put("isLock", isLock);

        update("Sys_Property.syncLockWhProc", ht);
        
    }
    
}
