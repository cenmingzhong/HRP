package com.gzhh.hrp.common.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.RoleMenuDao;
import com.gzhh.hrp.common.dao.SysMenuDao;
import com.gzhh.hrp.common.entity.RoleMenu;
import com.gzhh.hrp.common.entity.SysMenu;
import com.gzhh.hrp.common.service.RoleMenuService;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service
public class RoleMenuServiceImpl extends BaseService implements RoleMenuService {

    @Resource
    private RoleMenuDao roleMenuDao;
    @Resource
    private SysMenuDao sysMenuDao;

    public ResultView save(String sysRoleCode,List<RoleMenu> roleMenuList) {
        
        ResultView result = new ResultView();
        List<RoleMenu> list =roleMenuDao.getListByFilter(CommonTools.newHashMap("sysRoleCode", sysRoleCode));
        if(list.size()!=0){
            for(RoleMenu roleMenu :list){
                roleMenuDao.delete(roleMenu);
            }
        }
        for(RoleMenu roleMenu : roleMenuList){
            roleMenu.setId(getNewId());
            roleMenuDao.insert(roleMenu);
        }
        
        return result;
    }

    public ResultView add(RoleMenu roleMenu) {
        ResultView resultView = new ResultView();
    
        return resultView;
    }

    public ResultView update(RoleMenu roleMenu) {
        ResultView resultView = new ResultView();

        roleMenuDao.update(roleMenu);
        return resultView;
    }

    public ResultView getList(HashMap<String, Object> params) {
        ResultView resultView = new ResultView();

        return resultView;
    }

    public ResultView getInfo(String id) {
        ResultView resultView = new ResultView();

        RoleMenu roleMenu = roleMenuDao.get(id);
        resultView.putData("roleMenu", roleMenu);
        return resultView;
    }

    public ResultView delete(String id) {
        ResultView resultView = new ResultView();

        RoleMenu roleMenu = roleMenuDao.get(id);
        if(roleMenu!=null)
        {
          roleMenuDao.delete(roleMenu);
        }
        return resultView;
    }

    @Override
    public ResultView getRoleModuleMenuList(String sysRoleCode) {
        ResultView result = new ResultView();
        List<Map> roleMenuList = roleMenuDao.getRoleModuleMenuList(sysRoleCode);
        result.putData("roleMenuList", roleMenuList);
        return result;
    }

    
    public void setParentMenuForRole(String sysRoleCode, String sysMenuCode) {
        SysMenu sysMenu = sysMenuDao.get(sysMenuCode);
        if(sysMenu==null){
            throw new ValidateException("菜单已被删除!");
        }
        HashMap<String,Object> map = CommonTools.newHashMap("sysRoleCode", sysRoleCode);
        map.put("sysMenuCode", sysMenuCode);
        List<RoleMenu> list = roleMenuDao.getOneRoleMenu(map);
        if(list.size()!=0){
            for(RoleMenu rolemenu:list){
                roleMenuDao.delete(rolemenu);
            }
        }
        roleMenuDao.insert(new RoleMenu(getNewId(),sysRoleCode,sysMenuCode));
        if(StringTools.isNotEmpty(sysMenu.getSysMenuParent())){
            SysMenu parentMenu = sysMenuDao.get(sysMenu.getSysMenuParent());
            setParentMenuForRole(sysRoleCode,parentMenu.getSysMenuCode());
        }

    }
    public void setChildMenuForRole(String sysRoleCode, String sysMenuCode) {
        SysMenu sysMenu = sysMenuDao.get(sysMenuCode);
        List<SysMenu> list = sysMenuDao.getChildMenuList(sysMenu);
        if(list.size()!=0){
            for(SysMenu menu:list){
                roleMenuDao.insert(new RoleMenu(getNewId(),sysRoleCode,menu.getSysMenuCode()));
                setChildMenuForRole(sysRoleCode,menu.getSysMenuCode());
            }
        }
    }
    @Override
    public ResultView setRoleMenu(List<String> codeList, String sysMenuCode) {
        ResultView result = new ResultView();
        for(String sysRoleCode:codeList){
            SysMenu sysMenu = sysMenuDao.get(sysMenuCode);
            HashMap<String,Object> map = CommonTools.newHashMap("sysRoleCode", sysRoleCode);
            map.put("sysMenuCode", sysMenu.getSysMenuModule());
            List<RoleMenu> list= roleMenuDao.getOneRoleMenu(map);
            if(list.size()!=0){
                for(RoleMenu rolemenu:list){
                    roleMenuDao.delete(rolemenu);
                }
            }
            roleMenuDao.insert(new RoleMenu(getNewId(),sysRoleCode,sysMenu.getSysMenuModule()));
            setParentMenuForRole(sysRoleCode,sysMenuCode);
            setChildMenuForRole(sysRoleCode,sysMenuCode);
        }
        return result;
    }
    
}