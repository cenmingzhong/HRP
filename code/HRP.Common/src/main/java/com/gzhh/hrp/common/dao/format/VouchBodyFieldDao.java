package com.gzhh.hrp.common.dao.format;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.common.entity.VouchBodyField;

@Repository
public class VouchBodyFieldDao extends BaseDao<VouchBodyField> {
    public int deleteByVouchType(String vouchType){
        return delete("Sys_VouchBody.deleteByVouchType", vouchType);
    }
}
