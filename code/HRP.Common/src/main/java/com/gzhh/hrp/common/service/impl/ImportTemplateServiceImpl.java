package com.gzhh.hrp.common.service.impl;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.dao.ImportTemplateDao;
import com.gzhh.hrp.common.entity.ImportTemplate;
import com.gzhh.hrp.common.service.ImportTemplateService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;

@Service
public class ImportTemplateServiceImpl extends BaseService implements ImportTemplateService {

    @Resource
    private ImportTemplateDao importTemplateDao;
    
    public ResultView save(String dbType, List<ImportTemplate> importTemplateList){
        ResultView result = new ResultView();
        
        List<ImportTemplate> existList = importTemplateDao.getListByFilter(CommonTools.newHashMap("dbType", dbType));
        importTemplateDao.batchDelete(existList);
        
        if(CollectionTools.isNotEmpty(importTemplateList)){
            for (ImportTemplate importTemplate : importTemplateList) {
                importTemplate.setId(getNewId());
                importTemplate.setDbType(dbType);
                importTemplate.setFieldOrder(importTemplateList.indexOf(importTemplate));
                importTemplateDao.insert(importTemplate);
            }
        }
        result.setMessage(MessageSource.SAVE_SUCCESS);
        return result;
    }

    public ResultView getImportTemplateList(String dbType){
        ResultView result = new ResultView();
        
        List<ImportTemplate> importTemplateList = importTemplateDao.getListByFilter(CommonTools.newHashMap("dbType", dbType));
        if(CollectionTools.isNotEmpty(importTemplateList)){
            Collections.sort(importTemplateList, Comparator.comparing(ImportTemplate::getFieldOrder));
        }

        result.putData("importTemplateList", importTemplateList);
        return result;
    }
    
}
