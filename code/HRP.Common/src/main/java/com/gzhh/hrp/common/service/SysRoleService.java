package com.gzhh.hrp.common.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gzhh.hrp.common.entity.SysRole;
import com.gzhh.hrp.tools.ResultView;

public interface SysRoleService {

    public ResultView save(SysRole sysRole);
    public ResultView getList(HashMap<String, Object> filter);
    public ResultView getInfo(String sysRoleCode);
    public ResultView delete(String sysRoleCode);
	public ResultView saveAndAuth(SysRole sysRole, List<Map<String, String>> idsList, List<String> dataAuthList);
	public ResultView getUserRoleList(String sysUserCode);
}
