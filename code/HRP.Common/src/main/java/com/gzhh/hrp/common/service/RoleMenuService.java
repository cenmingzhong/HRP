package com.gzhh.hrp.common.service;

import java.util.HashMap;
import java.util.List;

import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.common.entity.RoleMenu;

public interface RoleMenuService {

    public ResultView save(String sysRoleCode,List<RoleMenu> roleMenuList);
    public ResultView getList(HashMap<String, Object> params);
    public ResultView getInfo(String id);
    public ResultView delete(String id);
    public ResultView getRoleModuleMenuList(String sysRoleCode);
    public ResultView setRoleMenu(List<String> codeList, String sysMenuCode);

    
}