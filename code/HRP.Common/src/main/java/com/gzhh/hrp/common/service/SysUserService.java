package com.gzhh.hrp.common.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gzhh.hrp.common.entity.SysUser;
import com.gzhh.hrp.tools.ResultView;

public interface SysUserService {
    
    public void save(SysUser user);
    public ResultView getList(HashMap<String, Object> params);
    public ResultView getInfo(String sysUserCode);
    public ResultView delete(String userCode);
    //用户登录操作
    public ResultView userLogin(String loginAccount,String loginPsw, String loginDate) ;
    //单点登录
    public ResultView singleLogin(String loginAccount);
    //同步用户
    public ResultView syncUser(List<Map<String, Object>> userList, String roleCode);
    


    
	public ResultView changePsw(String oldPsw, String newPsw);
}
