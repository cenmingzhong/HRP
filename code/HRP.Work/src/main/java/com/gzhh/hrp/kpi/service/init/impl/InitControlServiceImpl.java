package com.gzhh.hrp.kpi.service.init.impl;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.PresetUtil;
import com.gzhh.hrp.common.dao.ImportTemplateDao;
import com.gzhh.hrp.common.entity.ImportTemplate;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.kpi.entity.init.SysImportTemplate;

@Service
public class InitControlServiceImpl extends BaseService{

    @Resource
    private ImportTemplateDao importTemplateDao;
    
    @PostConstruct
    public void initBasePersistent() {
        try {
        	//System.out.println(1);
            PresetUtil.storePersistent(ImportTemplate.class, SysImportTemplate.getInstance(), importTemplateDao, "id");
        } catch (Exception e) {
            errorLog("初始化基础持久对象失败", e);
        }
    }
}
