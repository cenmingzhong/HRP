package com.gzhh.hrp.common.dao.format;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.common.entity.VouchFootField;


@Repository
public class VouchFootFieldDao extends BaseDao<VouchFootField> {
    public int deleteByVouchType(String vouchType){
        return delete("Sys_VouchFoot.deleteByVouchType", vouchType);
    }
}
