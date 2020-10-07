package com.gzhh.hrp.common.service;

import java.util.HashMap;
import java.util.List;

import com.gzhh.hrp.common.entity.DataAuth;
import com.gzhh.hrp.tools.ResultView;

public interface DataAuthService {

    /**
     * 获取数据权限树
     * @return
     */
    ResultView getDataAuthTree();

    /**
     * 获取权限列表
     * @param authType
     * @param authCode
     * @return
     */
    ResultView getDataAuthList(String authType, String authCode);

    /**
     * 保存数据权限
     * @param authType
     * @param authCode
     * @param authList
     * @return
     */
    ResultView saveDataAuth(String authType, String authCode, HashMap<String, List<DataAuth>> authList);

    ResultView getUserDataAuthList(String sysUserCode, String dbType);

    ResultView getDataAuthListByUser(String sysRoleCode);
    
    ResultView getDataAuthListByFile(String sysRoleCode);
}