package com.gzhh.hrp.db.service.impl;

import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.db.dao.DataDictDao;
import com.gzhh.hrp.db.dao.DataDictDetailDao;
import com.gzhh.hrp.db.entity.DataDict;
import com.gzhh.hrp.db.entity.DataDictDetail;
import com.gzhh.hrp.db.service.DataDictService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;
@Service
public class DataDictServiceImpl extends BaseService implements DataDictService {

    @Resource
    private DataDictDao dataDictDao;
    @Resource
    private DataDictDetailDao dataDictDetailDao;
    
    @Override
    public ResultView saveDictType(DataDict dataDict) {
        ResultView result = new ResultView();
        
        if(StringTools.isEmpty(dataDict.getDictTypeCode())){
            throw new ValidateException("字典类别编码不能为空");
        }
        if(StringTools.isEmpty(dataDict.getDictTypeName())){
            throw new ValidateException("字典类别名称不能为空");
        }
        if(dataDict.getIsNew()){
            DataDict existEntity = dataDictDao.get(dataDict.getDictTypeCode());
            if(existEntity != null){
                throw new ValidateException(MessageFormat.format("字典类别编码[{0}]已存在", dataDict.getDictTypeCode()));
            }
            dataDictDao.insert(dataDict);
        }else{
            dataDictDao.update(dataDict);
        }
        return result;
    }

    @Override
    public ResultView deleteDictType(String dictTypeCode) {
        ResultView result = new ResultView();
        List<DataDictDetail> dataDictDetailList = dataDictDetailDao.getListByFilter(CommonTools.newHashMap("dictTypeCode", dictTypeCode));
        if(CollectionTools.isNotEmpty(dataDictDetailList)){
            throw new ValidateException("存在字典档案，不能删除");
        }
        dataDictDao.delete(dictTypeCode);    
        return result;
    }

    @Override
    public ResultView getDictTypeList(){
        ResultView result = new ResultView();
        List<DataDict> dictTypeList = dataDictDao.getListByFilter(null);
        result.putData("dictTypeList", dictTypeList);
        return result;
    }

    @Override
    public ResultView getDictType(String dictTypeCode){
        ResultView result = new ResultView();
        DataDict dictType = dataDictDao.get(dictTypeCode);
        if(dictType == null){
            throw new ValidateException("字典类型不存在或已删除");
        }
        result.putData("dictType", dictType);
        return result;
    }
    
    @Override
    public ResultView save(DataDictDetail entity) {
        ResultView result = new ResultView();

        if(StringTools.isEmpty(entity.getDictCode())){
            throw new ValidateException("数据编码不能为空");
        }
        if(StringTools.isEmpty(entity.getDictName())){
            throw new ValidateException("数据名称不能为空");
        }
        if(StringTools.isEmpty(entity.getDictTypeCode())){
            throw new ValidateException("字典类别编码不能为空");
        }
        if(StringTools.isEmpty(entity.getId())){
            HashMap<String, Object> filter = new HashMap<String, Object>();
            filter.put("dictCode", entity.getDictCode());
            filter.put("dictTypeCode", entity.getDictTypeCode());
            
            List<DataDictDetail> existDetailList = dataDictDetailDao.getListByFilter(filter);
            if(CollectionTools.isNotEmpty(existDetailList)){
                throw new ValidateException(MessageFormat.format("数据编码[{0}]已存在", entity.getDictCode()));
            }
            entity.setId(getNewId());
            entity.setCreateTime(new Date());
            dataDictDetailDao.insert(entity);
        }else{
            HashMap<String, Object> filter = new HashMap<String, Object>();
            filter.put("dictCode", entity.getDictCode());
            filter.put("dictTypeCode", entity.getDictTypeCode());
            
            List<DataDictDetail> existDetailList = dataDictDetailDao.getListByFilter(filter);
            if(CollectionTools.isNotEmpty(existDetailList) && !StringTools.equals(entity.getId(), existDetailList.get(0).getId())){
                throw new ValidateException(MessageFormat.format("数据编码[{0}]已存在", entity.getDictCode()));
            }
            entity.setEidtTime(new Date());
            dataDictDetailDao.update(entity);
        }
        return result;
    }

    @Override
    public ResultView delete(String id) {
        ResultView result = new ResultView();      
        dataDictDetailDao.delete(id);    
        return result;
    }

    public ResultView getList(String dataTpyeCode){
        ResultView result = new ResultView();
        List<DataDictDetail> dataDictDetailList = dataDictDetailDao.getListByFilter(CommonTools.newHashMap("dictTypeCode", dataTpyeCode));
        result.putData("dataDictDetailList", dataDictDetailList);
        return result;
    }
    
    public ResultView getSearchList(HashMap<String, Object>  params){
        ResultView result = new ResultView();
        List<DataDictDetail> dataDictDetailList = dataDictDetailDao.getSearchList(params);
        result.putData("dataDictDetailList", dataDictDetailList);
        return result;
    }
    public ResultView getInfo(String id) {
        ResultView result = new ResultView();
        DataDictDetail dataDictDetail = dataDictDetailDao.get(id);
        result.putData("dataDictDetail", dataDictDetail);
        return result;
    }
}
