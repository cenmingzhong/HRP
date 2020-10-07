package com.gzhh.hrp.common.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.SysUserAccount;

@Repository
public class SysUserAccountDao extends BaseDao<SysUserAccount>{

    @SuppressWarnings("rawtypes")
	public List<Map> getAccount(String userCode) {
        return getMapList("SysUserAccount.getAccount", userCode);
    }
    
    public void deleteUserAccount(String userCode) {
        delete("SysUserAccount.deleteUserAccount", userCode);
    }
}
