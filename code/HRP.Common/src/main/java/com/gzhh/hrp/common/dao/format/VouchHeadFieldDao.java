package com.gzhh.hrp.common.dao.format;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.dao.BaseDao;
import com.gzhh.hrp.common.entity.VouchHeadField;

@Repository
public class VouchHeadFieldDao extends BaseDao<VouchHeadField> {

    public int deleteByVouchType(String vouchType){
        return delete("Sys_VouchHead.deleteByVouchType", vouchType);
    }

	public List<VouchHeadField> getAvailableUserDefineList(String vouch_Type) {
		return getList("Sys_VouchHead.getAvailableUserDefineList", vouch_Type);
	}
}
