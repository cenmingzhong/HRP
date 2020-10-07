package com.gzhh.hrp.common.dao;

import java.io.Serializable;
import java.util.HashMap;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.SysKey;

@Repository
public class SysKeyDao extends BaseDao<SysKey> {

    @Override
    public SysKey get(Serializable keyType) {
        return (SysKey)getObject("Sys_SysKey.get", keyType);
    }

    @Override
    public void update(SysKey entity) {
        update("Sys_SysKey.update", entity);
    }
    public Object getByYearMonth(String keyType, String keyYear, String keyMonth){
        
        HashMap<String,Object> map = new HashMap<String,Object>();
        map.put("keyType", keyType);
        map.put("keyYear", keyYear);
        map.put("keyMonth", keyMonth);

        return getObject("Sys_SysKey.getByYearMonth", map);
    }
    public Object updateKeySeqByYearMonth(SysKey sysKey){
        return getObject("Sys_SysKey.updateKeySeqByYearMonth", sysKey);
    }
   
}
