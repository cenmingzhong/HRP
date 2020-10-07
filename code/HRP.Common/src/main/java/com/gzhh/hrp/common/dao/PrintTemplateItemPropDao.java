package com.gzhh.hrp.common.dao;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.PrintTemplateItemProp;

@Repository
public class PrintTemplateItemPropDao extends BaseDao<PrintTemplateItemProp>{

    public int deleteByTemplateCode(String templateCode){
        return delete("Sys_PrintTemplateItemProp.deleteByTemplateCode", templateCode);
    }
}
