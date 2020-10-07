package com.gzhh.hrp.common.service;

import java.util.HashMap;

import com.gzhh.hrp.common.entity.SysMenu;
import com.gzhh.hrp.tools.ResultView;

public interface SysMenuService {

    ResultView getModuleList();
    ResultView saveModule(SysMenu module);
    ResultView saveMenu(SysMenu menu);
    ResultView getMenuListByModule(String sysMenuModule);
    ResultView getCurMenuList();
    ResultView getCurMenuTree();
    ResultView dragMenu(String beforeSysMenuCode, String afterSysMenuCode, String moveType);
    ResultView getMenu(String sysMenuCode);
    ResultView deleteMenu(String sysMenuCode);
    ResultView getAllModuleMenu();
	ResultView getMenuList(HashMap<String, Object> filter);
}