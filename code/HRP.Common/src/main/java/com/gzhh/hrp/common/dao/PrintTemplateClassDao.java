package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.PrintTemplateClass;

@Repository
public class PrintTemplateClassDao extends BaseDao<PrintTemplateClass>{
    public List<PrintTemplateClass> selectListByFilter(HashMap<String,Object>params){
        return getList("Sys_Print_Template_Class.selectListByFilter", params);
    }
    
    
}

