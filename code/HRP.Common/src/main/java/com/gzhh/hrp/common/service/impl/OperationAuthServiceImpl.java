package com.gzhh.hrp.common.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.DataAuthDao;
import com.gzhh.hrp.common.dao.OperationAuthDao;
import com.gzhh.hrp.common.dao.OperationDao;
import com.gzhh.hrp.common.dao.SysMenuDao;
import com.gzhh.hrp.common.dao.SysUserRoleDao;
import com.gzhh.hrp.common.entity.AppConfig;
import com.gzhh.hrp.common.entity.DataAuth;
import com.gzhh.hrp.common.entity.Operation;
import com.gzhh.hrp.common.entity.OperationAuth;
import com.gzhh.hrp.common.entity.SysMenu;
import com.gzhh.hrp.common.entity.SysUser;
import com.gzhh.hrp.common.entity.SysUserRole;
import com.gzhh.hrp.common.service.OperationAuthService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service()
public class OperationAuthServiceImpl extends BaseService implements OperationAuthService{
    
    @Resource
    private OperationAuthDao operationAuthDao;
    @Resource
    private OperationDao operationDao;
    @Resource
    private DataAuthDao dataAuthDao;
    @Resource
    private SysMenuDao sysMenuDao;
    @Resource
    private SysUserRoleDao sysUserRoleDao;
    
    private static String[] dataAuthStrList = {"查看公司数据","查看部门数据","查看公司文件","查看部门文件"};
    
    @Override
    public ResultView saveOperationAuthList(String sysRoleCode, String pathUrl, List<String> operIds) {
        ResultView result = new ResultView();

        operationAuthDao.deleteByRoleAndPathUrl(sysRoleCode, pathUrl);

        if (CollectionTools.isNotEmpty(operIds)){
            for (String id : operIds){
                OperationAuth operAuth = new OperationAuth();
                operAuth.setId(getNewId());
                operAuth.setSysRoleCode(sysRoleCode);
                operAuth.setOperId(id);

                operationAuthDao.insert(operAuth);
            }
        }
        return result;
    }

    @Override
    public ResultView getOperationAuthList(String sysRoleCode, String pathUrl) {
        ResultView result = new ResultView();

        List<OperationAuth> operationAuthList = operationAuthDao.getListByFilter(sysRoleCode,pathUrl);
        result.putData("operationAuthList",operationAuthList);

        return result;
    }
    
    @Override
    public ResultView getCurUserOperAuthList(String pathUrl)
    {
        ResultView result = new ResultView();

        SysUser user = sysUserDao.get(getLoginUser().getSysUserCode());
        if (user == null)
        {
            throw new ValidateException("当前用户不存在");
        }

        if (StringTools.equals(user.getSysUserAccount(), AppConfig.getAdminAccount()))
        {
            result.putData("NoCtrl", "Y");
        }
        else
        {
            List<SysMenu> menuList = sysMenuDao.getListByFilter(CommonTools.newHashMap("sysMenuUrl", pathUrl));
            if (CollectionTools.isEmpty(menuList))
            {
                result.putData("NoCtrl", "Y");
            }
            else
            {
                List<SysUserRole> userRoleList = sysUserRoleDao.getListByFilter(CommonTools.newHashMap("sysUserCode", user.getSysUserCode()));

                if (CollectionTools.isNotEmpty(userRoleList))
                {
                    List<String> roleCodeList = new ArrayList<String>();
                    for(SysUserRole userRole : userRoleList){
                        roleCodeList.add(userRole.getSysRoleCode());
                    }
                    String roleCodes = StringTools.listToString(roleCodeList, "','");

                    HashMap<String, Object> filter = new HashMap<String, Object>();
                    filter.put("pathUrl", pathUrl);
                    filter.put("sysRoleCodes", roleCodes);
                    List<Map> operationList = operationDao.getOperationAuthList(filter);

                    result.putData("operationList", operationList);
                }
            }
        }

        return result;
    }
    
    @Override
    public ResultView getAllOperationAuthList(HashMap<String, Object> filter) {
    	ResultView result = new ResultView();
    	
    	List<Operation> operationList = operationDao.getListByFilter(null);
    	
    	Map<String, List<Operation>> operationListMap = operationList.stream().collect(Collectors.groupingBy(Operation::getPathUrl));
    	
    	List<OperationAuth> operationAuthList = new ArrayList<>();
    	if(StringTools.isNotEmpty(filter.get("sysRoleCode"))) {
    		operationAuthList = operationAuthDao.getListByFilter(filter);
    	}
    	
    	List<SysMenu> menuList = sysMenuDao.getMenuList(CommonTools.newHashMap("hasUrl", 1));
    	List<Map<String, Object>> allMenu = new ArrayList<>();
    	for (SysMenu sysMenu : menuList) {
    		Map<String, Object> map = new HashMap<>();
    		map.put("pathUrl", sysMenu.getSysMenuUrl());
    		map.put("pathName", sysMenu.getSysMenuName());
    		if(operationListMap.containsKey(sysMenu.getSysMenuUrl())) {
    			List<Operation> list = operationListMap.get(sysMenu.getSysMenuUrl());
    			List<Map<String, Object>> allMenu1 = new ArrayList<>();
    			for (Operation operation : list) {
    				Map<String, Object> map1 = new HashMap<>();
    				map1.put("id", operation.getId());
    				map1.put("operCode", operation.getOperCode());
    				map1.put("operText", operation.getOperText());
    				List<OperationAuth> list2 = operationAuthList.stream().filter(m->StringTools.equals(m.getOperId(), operation.getId())).collect(Collectors.toList());
    				map1.put("selected", CollectionTools.isEmpty(list2)?true:false);
    				allMenu1.add(map1);
				}
    			map.put("buttons", allMenu1);
    		}
    		allMenu.add(map);
		}
    	//数据权限
    	List<DataAuth> dataAuthList = new ArrayList<>();
    	if(StringTools.isNotEmpty(filter.get("sysRoleCode"))) {
    		dataAuthList = dataAuthDao.getListByFilter(filter);
    	}
    	List<String> notSelected = new ArrayList<>();
    	for (DataAuth dataAuth : dataAuthList) {
    		notSelected.add(dataAuth.getAuthType());
		}
    	for (String data : dataAuthStrList) {
    		Map<String, Object> map = new HashMap<>();
    		map.put("pathUrl", data);
    		map.put("pathName", data);
				List<Map<String, Object>> allMenu1 = new ArrayList<>();
				Map<String, Object> map1 = new HashMap<>();
				map1.put("id", "允许");
				map1.put("operText", "允许");
				map1.put("selected", notSelected.contains(data)?false:true);
				allMenu1.add(map1);
				map.put("buttons", allMenu1);
    		allMenu.add(map);
			
		}
    	
    	result.putData("allMenu", allMenu);
    	
        return result;
    }
}
