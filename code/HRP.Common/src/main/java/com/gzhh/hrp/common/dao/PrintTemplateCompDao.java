package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.PrintTemplateComp;
import com.gzhh.hrp.tools.CollectionTools;

@Repository
public class PrintTemplateCompDao extends BaseDao<PrintTemplateComp>{

    public int deleteByTemplateCode(String templateCode){
        return delete("Sys_PrintTemplateComp.deleteByTemplateCode", templateCode);
    }
    public PrintTemplateComp getComponentByType(String templateCode, String compType) {
        HashMap<String,Object> ht = new HashMap<String,Object> ();
        ht.put("templateCode", templateCode);
        ht.put("componentType", compType);
        List<PrintTemplateComp> compList = getListByFilter(ht);
        if (CollectionTools.isNotEmpty(compList))
        {
            return compList.get(0);
        }
        return null;
    }
}
