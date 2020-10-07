package com.gzhh.hrp.common.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.dao.SysTableDictDao;
import com.gzhh.hrp.common.entity.SysTableDict;
import com.gzhh.hrp.common.service.SysTableDictService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class SysTableDictServiceImpl extends BaseService implements SysTableDictService {

    @Resource
    private SysTableDictDao sysTableDictDao;
    
    public ResultView save(SysTableDict sysTableDict){
        ResultView reuslt=  new ResultView();
        
        HashMap<String, Object> filter = new HashMap<String, Object>();
        filter.put("appKey", sysTableDict.getAppKey());
        filter.put("tableCode", sysTableDict.getTableCode());
        filter.put("columnCode", sysTableDict.getColumnCode());
        
        List<SysTableDict> existList = sysTableDictDao.getListByFilter(filter);
        if(CollectionTools.isEmpty(existList)){
            sysTableDict.setId(StringTools.getGuid());
            sysTableDictDao.insert(sysTableDict);
        }else{
            SysTableDict existEntity = existList.get(0);
            
            existEntity.setTableTitle(sysTableDict.getTableTitle());
            existEntity.setTableName(sysTableDict.getTableName());
            existEntity.setColumnTitle(sysTableDict.getColumnTitle());
            existEntity.setColumnName(sysTableDict.getColumnName());
            existEntity.setColumnType(sysTableDict.getColumnType());
            existEntity.setColumnLen(sysTableDict.getColumnLen());
            existEntity.setColumnPrecision(sysTableDict.getColumnPrecision());
            existEntity.setIsNull(sysTableDict.getIsNull());
            existEntity.setIsPk(sysTableDict.getIsPk());
            
            sysTableDictDao.update(existEntity);
        }
        return reuslt;
    }
}
