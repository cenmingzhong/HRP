package com.gzhh.hrp.common.tools;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.gzhh.hrp.common.HRPSession;
import com.gzhh.hrp.common.LoginState;
import com.gzhh.hrp.common.LoginUser;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.entity.SysRole;
import com.gzhh.hrp.common.service.DataAuthService;
import com.gzhh.hrp.common.service.SysRoleService;
import com.gzhh.hrp.common.service.SysUserService;
import com.gzhh.hrp.extension.spring.SpringContextUtil;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

public class DataAuthTools {
    
    public static String getDataAuth(String colName){
        LoginState currentLoginState = HRPSession.getLoginStateBySessionId(HRPSession.getSessionId());
        if(currentLoginState == null){
            throw new ValidateException("登录超时，请重新登录");
        }
        LoginUser loginUser = currentLoginState.getLoginUser();
        if(loginUser==null){
            throw new ValidateException("登录超时，请重新登录");
        }
        List<String> conditionList =new ArrayList<String>();
        
    	SysRoleService role = SpringContextUtil.getBean("sysRoleService");
    	ResultView roleList = role.getUserRoleList(loginUser.getSysUserCode());
    	List<SysRole> userRoleList = (List<SysRole>)roleList.getData("userRoleList");
    	if(CollectionTools.isNotEmpty(userRoleList)) {
    		String sysRoleCode = userRoleList.get(0).getSysRoleCode();
    		DataAuthService dataAuthService = SpringContextUtil.getBean("dataAuthService");
    		ResultView dataAuthListByUser = dataAuthService.getDataAuthListByUser(sysRoleCode);
    		Integer auth = (Integer)dataAuthListByUser.getData("auth");
    		if(auth!=null) {
    			if(auth==2) {
    				conditionList.add("1=1");
        		}else if(auth==1) {
        			SysUserService service = SpringContextUtil.getBean("sysUserService");
        			ResultView list = service.getList(CommonTools.newHashMap("sysDeptCode", loginUser.getDeptCode()));
        			List<Map> userList = (List<Map>)list.getData("userList");
        			if(CollectionTools.isNotEmpty(userList)) {
        				StringBuilder userCodeList = new StringBuilder();
        				for (Map map : userList) {
        					String userCode = (String)map.get("sys_user_code");
        					if(StringTools.equals(userCodeList.toString(), "")) {
        						userCodeList.append("('"+userCode+"'");
        					}else {
        						userCodeList.append(",'"+userCode+"'");
        					}
        				}
        				userCodeList.append(")");
        				conditionList.add(colName+" in "+userCodeList.toString());
        			}
        		}else {
        			conditionList.add(colName+"='"+loginUser.getSysUserCode()+"'");
        			//conditionList.add(colName+"="+loginUser.getSysUserCode());
        		}
    		}
    	}
        
        if(CollectionTools.isEmpty(conditionList)){
            conditionList.add("1=0");
        }
        return " (" +StringTools.listToString(conditionList, " or ")+") ";
    }
    
    public static String getDeptAuth(String colName){
    	LoginState currentLoginState = HRPSession.getLoginStateBySessionId(HRPSession.getSessionId());
    	if(currentLoginState == null){
    		throw new ValidateException("登录超时，请重新登录");
    	}
    	LoginUser loginUser = currentLoginState.getLoginUser();
    	if(loginUser==null){
    		throw new ValidateException("登录超时，请重新登录");
    	}
    	List<String> conditionList =new ArrayList<String>();
    	
    	SysRoleService role = SpringContextUtil.getBean("sysRoleService");
    	ResultView roleList = role.getUserRoleList(loginUser.getSysUserCode());
    	List<SysRole> userRoleList = (List<SysRole>)roleList.getData("userRoleList");
    	if(CollectionTools.isNotEmpty(userRoleList)) {
    		String sysRoleCode = userRoleList.get(0).getSysRoleCode();
    		DataAuthService dataAuthService = SpringContextUtil.getBean("dataAuthService");
    		ResultView dataAuthListByUser = dataAuthService.getDataAuthListByUser(sysRoleCode);
    		Integer auth = (Integer)dataAuthListByUser.getData("auth");
    		if(auth!=null) {
    			if(auth==2) {
    				conditionList.add("1=1");
    			}else {
    				conditionList.add(colName+"='"+loginUser.getDeptCode()+"'");
    			}
    		}
    	}
    	
    	if(CollectionTools.isEmpty(conditionList)){
    		conditionList.add("1=0");
    	}
    	return " (" +StringTools.listToString(conditionList, " or ")+") ";
    }
    
    public static String getFileRole(String colName){
    	LoginState currentLoginState = HRPSession.getLoginStateBySessionId(HRPSession.getSessionId());
    	if(currentLoginState == null){
    		throw new ValidateException("登录超时，请重新登录");
    	}
    	LoginUser loginUser = currentLoginState.getLoginUser();
    	if(loginUser==null){
    		throw new ValidateException("登录超时，请重新登录");
    	}
    	List<String> conditionList =new ArrayList<String>();
    	
    	SysRoleService role = SpringContextUtil.getBean("sysRoleService");
    	ResultView roleList = role.getUserRoleList(loginUser.getSysUserCode());
    	List<SysRole> userRoleList = (List<SysRole>)roleList.getData("userRoleList");
    	if(CollectionTools.isNotEmpty(userRoleList)) {
    		String sysRoleCode = userRoleList.get(0).getSysRoleCode();
    		DataAuthService dataAuthService = SpringContextUtil.getBean("dataAuthService");
    		ResultView dataAuthListByUser = dataAuthService.getDataAuthListByFile(sysRoleCode);
    		Integer auth = (Integer)dataAuthListByUser.getData("auth");
    		if(auth!=null) {
    			if(auth==2) {
    				conditionList.add("1=1");
        		}else if(auth==1) {
        			SysUserService service = SpringContextUtil.getBean("sysUserService");
        			ResultView list = service.getList(CommonTools.newHashMap("sysDeptCode", loginUser.getDeptCode()));
        			List<Map> userList = (List<Map>)list.getData("userList");
        			if(CollectionTools.isNotEmpty(userList)) {
        				StringBuilder userCodeList = new StringBuilder();
        				for (Map map : userList) {
        					String userCode = (String)map.get("sys_user_code");
        					if(StringTools.equals(userCodeList.toString(), "")) {
        						userCodeList.append("('"+userCode+"'");
        					}else {
        						userCodeList.append(",'"+userCode+"'");
        					}
        				}
        				userCodeList.append(")");
        				conditionList.add(colName+" in "+userCodeList.toString());
        			}
        		}else {
        			conditionList.add(colName+"='"+loginUser.getSysUserCode()+"'");
        		}
    		}
    	}
    	
    	if(CollectionTools.isEmpty(conditionList)){
    		conditionList.add("1=0");
    	}
    	return " (" +StringTools.listToString(conditionList, " or ")+") ";
    }
}