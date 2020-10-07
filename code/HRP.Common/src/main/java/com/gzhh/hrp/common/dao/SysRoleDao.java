package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.SysRole;
import com.gzhh.hrp.tools.CommonTools;

@Repository
public class SysRoleDao extends BaseDao<SysRole> {

    @SuppressWarnings("unchecked")
    public List<HashMap<String, Object>> getRoleModuleMenuList(String sysRoleCode) {
        
        return (List<HashMap<String, Object>>) getObject("SysRole.getRoleModuleMenuList",sysRoleCode);
    }

    public List<SysRole> getUserRoleList(String sysUserCode) {
        
        return getList("SysRole.getUserRoleList",CommonTools.newHashMap("sysUserCode", sysUserCode));
    }

    public List<SysRole> getRoleList(HashMap<String, Object> params) {
        return getList("SysRole.getRoleList",params);
    }

	public void deleteBySysUserCode(String sysUserCode) {
		delete("SysRole.deleteBySysUserCode",sysUserCode);
	}

	public List<SysRole> getUserRoleListByAuth(String sysUserCode) {
		
		return getList("SysRole.getUserRoleListByAuth",CommonTools.newHashMap("sysUserCode", sysUserCode));
	}

}
