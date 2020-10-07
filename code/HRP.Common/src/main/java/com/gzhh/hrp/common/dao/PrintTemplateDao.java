package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.PrintTemplate;

@Repository
public class PrintTemplateDao extends BaseDao<PrintTemplate>{

    public void removeOtherDefault(String templateClsCode, String templateCode) {
        HashMap<String,Object>params=new HashMap<String,Object>();
        params.put("templateClsCode", templateClsCode);
        params.put("templateCode", templateCode);
        update("Sys_Print_Template.removeOtherDefault", params);
       
    }
	public List<PrintTemplate> getTemplateTree(HashMap<String,Object>params){
	    return getList("Sys_Print_Template.getTemplateTree", params);
	    
	}
	public List<PrintTemplate> selectListByFilter(HashMap<String,Object>params){
	    return getList("Sys_Print_Template.selectListByFilter", params);
	    
	}
}