package com.gzhh.hrp.common.dao;

import java.util.HashMap;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.PrintTemplateUserDef;

@Repository
public class PrintTemplateUserDefDao extends BaseDao<PrintTemplateUserDef>{

    public int deleteByCode(HashMap<String, Object> ht) {
       return getInt("Sys_Print_Template_User_Def.deleteByCode", ht);
        
    }

}