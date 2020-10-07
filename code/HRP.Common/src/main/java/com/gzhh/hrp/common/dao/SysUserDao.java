package com.gzhh.hrp.common.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.gzhh.hrp.common.entity.SysUser;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;

@Repository
public class SysUserDao extends BaseDao<SysUser> {

   @SuppressWarnings("rawtypes")
   public List<Map> getUserList(HashMap<String, Object> filters){
       List<Map> list = getMapList("SysUser.getList", filters);
       return list;
   }
   public Object getUserList(String userCode, String userName, String roleCode, String userAccount){
       HashMap<String,Object> map = new HashMap<String,Object>();
       map.put("sysUserCode", userCode);
       map.put("sysUserName", userName);
       map.put("sysRoleCode", roleCode);
       map.put("sysUserAccount", userAccount);
       return getObject("SysUser.getList", map);
   }
   
   public SysUser getUserByLoginAccount(String loginAccount){
       List<SysUser> sysUserList = getListByFilter(CommonTools.newHashMap("sysUserAccount", loginAccount));
       
       if(CollectionTools.isEmpty(sysUserList)){
           return null;
       }else{
           return sysUserList.get(0);
       }
   }
   
   public int clearUserItem(String sysUserCode){
       return delete("SysUser.clearUserItem", sysUserCode);
   }
   
   @SuppressWarnings("rawtypes")
   public List<Map> getCostInfo(HashMap<String, Object> filter) {
	   return  getMapList("SysUser.getUserCost",filter);
	}
	
	public List<String> getUserCodesByUploadTime(Date uploadTime) {
	   return getEntityList("SysUser.getUserCodesByUploadTime", uploadTime);
    }
	public SysUser getInfo(String sysUserCode) {
		return get("SysUser.getInfo",sysUserCode);
	}
}
