package com.gzhh.hrp.common.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.SysMenu;
import com.gzhh.hrp.tools.CommonTools;

@Repository
public class SysMenuDao extends BaseDao<SysMenu> {

    public int getMaxOrder(String sysMenuType, String sysMenuModule, String sysMenuParent) {
        HashMap<String, Object> filter = new HashMap<String, Object>();
        filter.put("sysMenuType", sysMenuType);
        filter.put("sysMenuModule", sysMenuModule);
        filter.put("sysMenuParent", sysMenuParent);
        
        return getInt("Sys_SysMenu.getMaxOrder", filter);
    }
    
    public void updateOrder(String sysMenuType, String sysMenuModule, String sysMenuParent, Integer maxOrder, Integer minOrder, int way)
    {
        HashMap<String, Object> ht = new HashMap<>();

        ht.put("sysMenuType", sysMenuType);
        ht.put("sysMenuModule", sysMenuModule);
        ht.put("sysMenuParent", sysMenuParent);
        ht.put("maxOrder", maxOrder);
        ht.put("minOrder", minOrder);
        ht.put("way", way);

        update("Sys_SysMenu.updateOrder", ht);
    }
    
    public List<SysMenu> getChildMenuList(SysMenu menu){
        return getList("Sys_SysMenu.getChildMenuList", CommonTools.newHashMap("sysMenuParent", menu.getSysMenuCode()));
    }

    public List<SysMenu> getAllModuleMenu() {
        return getList("Sys_SysMenu.getAllModuleMenu",null);
    }

    public List<SysMenu> getRoleModuleList(String sysRoleCode) {
        
        return getList("RoleMenu.getRoleModuleList",CommonTools.newHashMap("sysRoleCode", sysRoleCode));
    }

    public List<SysMenu> getRoleMenuList(String sysRoleCode, String sysMenuCode) {
        HashMap<String,Object> map = CommonTools.newHashMap("sysMenuCode", sysMenuCode);
        map.put("sysRoleCode", sysRoleCode);
        return getList("RoleMenu.getRoleMenuList",map);
    }
    
    public List<SysMenu> getMenuTreeByUser(String sysUserCode){
        return getList("Sys_SysMenu.getMenuTreeByUser",CommonTools.newHashMap("sysUserCode", sysUserCode));
    }

	public List<SysMenu> getMenuList(HashMap<String, Object> filter) {
		return getEntityList("Sys_SysMenu.getMenuList", filter);
	}
	
   @SuppressWarnings("rawtypes")
   public List<Map> createInitialFun() {
       return getMapList("Sys_SysMenu.createInitialFun",null);
   }
	   
   @SuppressWarnings("rawtypes")
   public List<Map> findInitialFun() {
       return getMapList("Sys_SysMenu.findInitialFun",null);
   }
}
