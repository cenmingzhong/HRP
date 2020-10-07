package com.gzhh.hrp.common.service.impl;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.DataAuthDao;
import com.gzhh.hrp.common.dao.OperationAuthDao;
import com.gzhh.hrp.common.dao.OperationDao;
import com.gzhh.hrp.common.dao.RoleMenuDao;
import com.gzhh.hrp.common.dao.SysMenuDao;
import com.gzhh.hrp.common.dao.SysRoleDao;
import com.gzhh.hrp.common.dao.SysUserRoleDao;
import com.gzhh.hrp.common.entity.DataAuth;
import com.gzhh.hrp.common.entity.Operation;
import com.gzhh.hrp.common.entity.OperationAuth;
import com.gzhh.hrp.common.entity.RoleMenu;
import com.gzhh.hrp.common.entity.SysMenu;
import com.gzhh.hrp.common.entity.SysRole;
import com.gzhh.hrp.common.entity.SysUserRole;
import com.gzhh.hrp.common.service.OperationAuthService;
import com.gzhh.hrp.common.service.SysRoleService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service("sysRoleService")
public class SysRoleServiceImpl extends BaseService implements SysRoleService {

    @Resource
    private SysRoleDao sysRoleDao;
    @Resource
    private SysUserRoleDao sysUserRoleDao;
    @Resource
    private SysMenuDao sysMenuDao;
    @Resource
    private DataAuthDao dataAuthDao;
    @Resource
    private OperationAuthDao operationAuthDao;
    
    @Resource
    private OperationAuthService operationAuthService;
    @Resource
    private OperationDao operationDao;
    @Resource
    private RoleMenuDao roleMenuDao;
    
    private static String[] dataAuthStrList = {"查看公司数据","查看部门数据","查看公司文件","查看部门文件"};
    
    public ResultView save(SysRole sysRole) {
        if(sysRole.getIsNew()){
            return add(sysRole);
        }else{
            return update(sysRole);
        }
    }
    
    @Override
    public ResultView saveAndAuth(SysRole sysRole, List<Map<String, String>> idsList,List<String> dataAuthList) {
    	Map<String, List<String>> grouping = new HashMap<>();
    	for (Map<String, String> map : idsList) {
			//operId  pathUrl
    		if(grouping.containsKey(map.get("pathUrl"))) {
    			List<String> list = grouping.get(map.get("pathUrl"));
    			list.add(map.get("operId"));
    		}else {
    			List<String> list = new ArrayList<>();
    			list.add(map.get("operId"));
    			grouping.put(map.get("pathUrl"), list);
    		}
		}
    	List<Operation> operationList = operationDao.getListByFilter(null);
    	List<String> notMenuUrl = new ArrayList<>();
		List<OperationAuth> deleteOList = operationAuthDao.getListByFilter(CommonTools.newHashMap("sysRoleCode", sysRole.getSysRoleCode()));
		if(CollectionTools.isNotEmpty(deleteOList)) {
    		operationAuthDao.batchDelete(deleteOList);
    	}
    	for (String key : grouping.keySet()) {
    		List<Operation> collect = operationList.stream().filter(m->StringTools.equals(m.getPathUrl(), key)).collect(Collectors.toList());
    		List<String> list = grouping.get(key);
    		if(CollectionTools.isNotEmpty(collect)&&CollectionTools.isNotEmpty(list)&&collect.size()==list.size()) {
    			notMenuUrl.add(key);
    		}
    		operationAuthService.saveOperationAuthList(sysRole.getSysRoleCode(), key, grouping.get(key));
    	}
    	//菜单
    	List<RoleMenu> roleMenuDeleteList = roleMenuDao.getListByFilter(CommonTools.newHashMap("sysRoleCode", sysRole.getSysRoleCode()));
    	roleMenuDao.batchDelete(roleMenuDeleteList);
    	
    	List<SysMenu> menuList = sysMenuDao.getListByFilter(null);
    	List<RoleMenu> roleMenuList = new ArrayList<>();
    	if(CollectionTools.isNotEmpty(notMenuUrl)) {
    		List<String> notMenuCode = outRoleMenuList(notMenuUrl,menuList);
    		List<SysMenu> collect = menuList.stream().filter(m->!notMenuCode.contains(m.getSysMenuCode())).collect(Collectors.toList());
    		for (SysMenu sysMenu : collect) {
    			RoleMenu roleMenu = new RoleMenu();
    			roleMenu.setId(getNewId());
    			roleMenu.setSysMenuCode(sysMenu.getSysMenuCode());
    			roleMenu.setSysRoleCode(sysRole.getSysRoleCode());
    			roleMenuList.add(roleMenu);
			}
    	}else {
    		for (SysMenu sysMenu : menuList) {
    			RoleMenu roleMenu = new RoleMenu();
    			roleMenu.setId(getNewId());
    			roleMenu.setSysMenuCode(sysMenu.getSysMenuCode());
    			roleMenu.setSysRoleCode(sysRole.getSysRoleCode());
    			roleMenuList.add(roleMenu);
			}
    	}
    	if(CollectionTools.isNotEmpty(roleMenuList)) {
			roleMenuDao.batchInsert(roleMenuList);
		}
    	
    	//数据权限
    	List<DataAuth> deleteList = dataAuthDao.getListByFilter(CommonTools.newHashMap("sysRoleCode", sysRole.getSysRoleCode()));
    	if(CollectionTools.isNotEmpty(deleteList)) {
    		dataAuthDao.batchDelete(deleteList);
    	}
    	List<DataAuth> insertList = new ArrayList<>();
    	for (String dataAuth : dataAuthList) {
    		DataAuth data = new DataAuth();
    		data.setId(getNewId());
    		data.setSysRoleCode(sysRole.getSysRoleCode());
    		data.setAuthType(dataAuth);
    		data.setSelected(false);
    		insertList.add(data);
		}
    	if(CollectionTools.isNotEmpty(insertList)) {
    		dataAuthDao.batchInsert(insertList);
    	}
    	
    	if(sysRole.getIsNew()){
            return add(sysRole);
        }else{
            return update(sysRole);
        }
    }
    
    private List<String> outRoleMenuList(List<String> notMenuUrl,List<SysMenu> menuList) {
    	List<String> notMenuCode = new ArrayList<>();
    	List<String> notParentMenuCode = new ArrayList<>();
		for (String notUrl : notMenuUrl) {
			List<SysMenu> collect = menuList.stream().filter(m->StringTools.equals(m.getSysMenuUrl(), notUrl)).collect(Collectors.toList());
			SysMenu sysMenu = collect.get(0);
			notMenuCode.add(sysMenu.getSysMenuCode());
			if(StringTools.isNotEmpty(sysMenu.getSysMenuParent())) {
				notParentMenuCode.add(sysMenu.getSysMenuParent());
			}
		}
		if(CollectionTools.isNotEmpty(notMenuCode)) {
			notMenuCode.addAll(checkParent(notParentMenuCode,menuList));
		}
		return notMenuCode;
	}

	private List<String> checkParent(List<String> notMenuCode, List<SysMenu> menuList) {
		Map<String, Integer> grouping = new HashMap<>();
		for(String obj: notMenuCode){
            if(grouping.containsKey(obj)){//判断是否已经有该数值，如有，则将次数加1
            	grouping.put(obj, grouping.get(obj) + 1);
            }else{
            	grouping.put(obj, 1);
            }
        }
		List<String> notParentMenuCode = new ArrayList<>();
		List<String> returnParentMenuCode = new ArrayList<>();
		if(StringTools.isNotEmpty(notMenuCode)) {
			for (String key : grouping.keySet()) {
				Integer integer = grouping.get(key);
				List<SysMenu> collect = menuList.stream().filter(m->StringTools.equals(m.getSysMenuParent(), key)).collect(Collectors.toList());
				if(integer.intValue()==collect.size()) {
					SysMenu menu = menuList.stream().filter(m->StringTools.equals(m.getSysMenuCode(), key)).collect(Collectors.toList()).get(0);
					returnParentMenuCode.add(menu.getSysMenuCode());
					if(StringTools.isNotEmpty(menu.getSysMenuParent())) {
						notParentMenuCode.add(menu.getSysMenuParent());
					}
				}
			}
			if(CollectionTools.isNotEmpty(notParentMenuCode)) {
				returnParentMenuCode.addAll(checkParent(notParentMenuCode,menuList));
			}
		}
		return returnParentMenuCode;
	}

	public ResultView add(SysRole sysRole) {
        ResultView result = new ResultView();

        validateRole(sysRole);
        sysRole.setCreateTime(new Date());
        sysRole.setCreator(getLoginUser().getSysUserName());
        sysRoleDao.insert(sysRole);
        
        return result;
    }
    
    public ResultView update(SysRole sysRole) {
        ResultView result = new ResultView();

        validateRole(sysRole);
        sysRoleDao.update(sysRole);
        
        return result;
    }
    
    private void validateRole(SysRole sysRole){
        if(StringTools.isEmpty(sysRole.getSysRoleCode())){
            throw new ValidateException("角色编码不能未空");
        }
        if(StringTools.isEmpty(sysRole.getSysRoleName())){
            throw new ValidateException("角色名称不能未空");
        }
        if(sysRole.getIsNew()){
            List<SysRole> existRoleList = sysRoleDao.getListByFilter(CommonTools.newHashMap("sysRoleCode", sysRole.getSysRoleCode()));
            if(CollectionTools.isNotEmpty(existRoleList)){
                throw new ValidateException(MessageFormat.format("角色编码[{0}]已存在", sysRole.getSysRoleCode()));
            }
            existRoleList = sysRoleDao.getListByFilter(CommonTools.newHashMap("sysRoleName", sysRole.getSysRoleName()));
            if(CollectionTools.isNotEmpty(existRoleList)){
                throw new ValidateException(MessageFormat.format("角色名称[{0}]已存在", sysRole.getSysRoleName()));
            }
        }else{
            List<SysRole> existRoleList = sysRoleDao.getListByFilter(CommonTools.newHashMap("sysRoleName", sysRole.getSysRoleName()));
            if(CollectionTools.isNotEmpty(existRoleList) && !StringTools.equals(existRoleList.get(0).getSysRoleCode(), sysRole.getSysRoleCode())){
                throw new ValidateException(MessageFormat.format("角色名称[{0}]已存在", sysRole.getSysRoleName()));
            }
        }
    }
    
    public ResultView getList(HashMap<String, Object> params){
        ResultView result = new ResultView();
        List<SysRole> roleList = sysRoleDao.getRoleList(params);
        
       // HashMap<String, Object> s = new HashMap<String, Object>();
        
        result.putData("roleList", roleList);
       // result.putData("list", s);
        
        return result;
    }
    
    public ResultView getInfo(String sysRoleCode) {
        ResultView result = new ResultView();
        
        SysRole sysRole = sysRoleDao.get(sysRoleCode);
        result.putData("sysRole", sysRole);
        
        return result;
    }
    
    @Transactional
    public ResultView delete(String sysRoleCode){
        ResultView result = new ResultView();
        
        if(StringTools.isEmpty(sysRoleCode)){
            throw new ValidateException("角色编码不能为空");
        }
        
        List<SysUserRole> userRoleList = sysUserRoleDao.getListByFilter(CommonTools.newHashMap("sysRoleCode", sysRoleCode));
        if(CollectionTools.isNotEmpty(userRoleList)){
            for(SysUserRole userRole: userRoleList){
                sysUserRoleDao.delete(userRole);
            }
        }
        //数据权限也删除
        HashMap<String, Object> filter = CommonTools.newHashMap("authCode", sysRoleCode);
        List<DataAuth> list1 = dataAuthDao.getListByFilter(filter);
        HashMap<String, Object> filter1 = CommonTools.newHashMap("dbCode", sysRoleCode);
        List<DataAuth> list2 = dataAuthDao.getListByFilter(filter1);
        list1.addAll(list2);
        if(list1.size()>0) {
        	dataAuthDao.batchDelete(list1);
        }
        sysRoleDao.delete(sysRoleCode);
        
        return result;
    }
    
    public SysRoleDao getSysRoleDao() {
        return sysRoleDao;
    }

    public void setSysRoleDao(SysRoleDao sysRoleDao) {
        this.sysRoleDao = sysRoleDao;
    }

    public SysMenuDao getSysMenuDao() {
        return sysMenuDao;
    }

    public void setSysMenuDao(SysMenuDao sysMenuDao) {
        this.sysMenuDao = sysMenuDao;
    }
    @Override
    public ResultView getUserRoleList(String sysUserCode) {
    	ResultView result = new ResultView();
    	List<SysRole> userRoleList = sysRoleDao.getUserRoleList(sysUserCode);
    	result.putData("userRoleList", userRoleList);
    	return result;
    	
    }
    
}
