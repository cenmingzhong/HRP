package com.gzhh.hrp.common.dao;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.PrintTemplateItem;

@Repository
public class PrintTemplateItemDao extends BaseDao<PrintTemplateItem>{

    public int deleteByTemplateCode(String templateCode){
        return delete("Sys_PrintTemplateItem.deleteByTemplateCode", templateCode);
    }
    
    @Override
    public List<PrintTemplateItem> getListByFilter(HashMap<String, Object> filer) {
        return super.getListByFilter(filer).stream().sorted(Comparator.comparing(PrintTemplateItem::getItemOrder)).collect(Collectors.toList());
    }
}
