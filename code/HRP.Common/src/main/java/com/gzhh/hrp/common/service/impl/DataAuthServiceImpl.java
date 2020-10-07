package com.gzhh.hrp.common.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.gzhh.hrp.common.HRPSession;
import com.gzhh.hrp.common.LoginState;
import com.gzhh.hrp.common.LoginUser;
import com.gzhh.hrp.common.TreeNode;
import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.DataAuthDao;
import com.gzhh.hrp.common.dao.SysRoleDao;
import com.gzhh.hrp.common.dao.SysUserDao;
import com.gzhh.hrp.common.dao.SysUserRoleDao;
import com.gzhh.hrp.common.entity.AppConfig;
import com.gzhh.hrp.common.entity.DataAuth;
import com.gzhh.hrp.common.entity.SysRole;
import com.gzhh.hrp.common.entity.SysUser;
import com.gzhh.hrp.common.entity.SysUserRole;
import com.gzhh.hrp.common.service.DataAuthService;
import com.gzhh.hrp.extension.spring.SpringContextUtil;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service("dataAuthService")
public class DataAuthServiceImpl extends BaseService implements DataAuthService {

    @Resource
    private DataAuthDao dataAuthDao;
    @Resource
    private SysUserDao sysUserDao;
    @Resource
    private SysRoleDao sysRoleDao;
    @Resource
    private SysUserRoleDao sysUserRoleDao;
    
    public final static String DB_TYPE_ROLE = "ROEL";

    /**
     * 获取数据权限树
     * @return
     */
    public ResultView getDataAuthTree()
    {
        ResultView result = new ResultView();

        List<SysUser> userList = sysUserDao.getListByFilter(null);
        List<SysRole> roleList = sysRoleDao.getListByFilter(null);

        List<TreeNode> treeList = new ArrayList<TreeNode>();

        if (CollectionTools.isNotEmpty(userList))
        {
            TreeNode userRoot = new TreeNode();
            userRoot.setNodeCode("User");
            userRoot.setNodeName("用户");
            userRoot.setNodeType("");
            userRoot.setNodeParent("");
            userRoot.setEntity(null);
            
            treeList.add(userRoot);
            
            for (SysUser user : userList){
                TreeNode userNode = new TreeNode();
                userNode.setNodeCode("u_"+user.getSysUserCode());
                userNode.setNodeName(user.getSysUserName());
                userNode.setNodeType("U");
                userNode.setEntity(user.getSysUserCode());
                userNode.setNodeParent("User");
                
                treeList.add(userNode);
            }
        }

        if (CollectionTools.isNotEmpty(roleList))
        {
            TreeNode roleRoot = new TreeNode();
            roleRoot.setNodeCode("Role");
            roleRoot.setNodeName("角色");
            roleRoot.setNodeType("");
            roleRoot.setNodeParent("");
            roleRoot.setEntity(null);
            
            treeList.add(roleRoot);
            
            for (SysRole role : roleList)
            {
                TreeNode userNode = new TreeNode();
                userNode.setNodeCode("r_"+role.getSysRoleCode());
                userNode.setNodeName(role.getSysRoleName());
                userNode.setNodeType("R");
                userNode.setEntity(role.getSysRoleCode());
                userNode.setNodeParent("Role");
                
                treeList.add(userNode);
                
            }
        }

        result.putData("authTree", treeList);

        return result;
    }

    /**
     * 获取权限列表
     * @param authType
     * @param authCode
     * @return
     */
    public ResultView getDataAuthList(String authType, String authCode)
    {
        ResultView result = new ResultView();

        HashMap<String, Object> params = new HashMap<String,Object>();
        params.put("authType", authType);
        params.put("authCode", authCode);
        
        //管理角色权限
        params.put("dbType",DB_TYPE_ROLE);
        List<Map> roleAuthList = dataAuthDao.getRoleAuthList(params);
        
        result.putData("roleAuthList", roleAuthList);
        
        return result;
    }

    /// <summary>
    /// 保存数据权限
    /// </summary>
    /// <param name="authType"></param>
    /// <param name="authCode"></param>
    /// <param name="authList"></param>
    /// <returns></returns>
    public ResultView saveDataAuth(String authType, String authCode,HashMap<String, List<DataAuth>> authList){
        ResultView result = new ResultView();
        List<DataAuth> roleAuthList = authList.get("roleAuthList");

        HashMap<String, Object> ht = new HashMap<String, Object>();
        ht.put("authType", authType);
        ht.put("authCode", authCode);

        dataAuthDao.clearDataAuth(ht);
        //保存角色权限
        if (CollectionTools.isNotEmpty(roleAuthList)){
            for (DataAuth dataAuth : roleAuthList){
                dataAuth.setId(getNewId());
                dataAuth.setAuthCode(authCode);
                dataAuth.setAuthType(authType);

                dataAuthDao.insert(dataAuth);
            }
        }

        return result;
    }

    public ResultView getUserDataAuthList(String sysUserCode, String dbType){
        ResultView result = new ResultView();
        
        HashMap<String, Object> params = new HashMap<String,Object>();
        params.put("authCode", sysUserCode);
        params.put("dbType", dbType);
        params.put("authType", "U");
        List<DataAuth> dataList = dataAuthDao.getListByFilter(params);
        
        List<SysUserRole> userRoleList = sysUserRoleDao.getListByFilter(CommonTools.newHashMap("sysUserCode", sysUserCode));
        if(CollectionTools.isNotEmpty(userRoleList)){
            for(SysUserRole userRole : userRoleList){

                params.put("authType", "R");
                params.put("authCode", userRole.getSysRoleCode());
                
                dataList.addAll(dataAuthDao.getListByFilter(params));
            }
        }
        result.putData("dataAuthList", dataList);
        
        return result;
    }
    
    @SuppressWarnings("unchecked")
    public static String getDataFilter(String colName, String dbType){
        LoginState currentLoginState = HRPSession.getLoginStateBySessionId(HRPSession.getSessionId());
        if(currentLoginState == null){
            throw new ValidateException("登录超时，请重新登录");
        }
        LoginUser loginUser = currentLoginState.getLoginUser();
        if(loginUser==null){
            throw new ValidateException("登录超时，请重新登录");
        }
        List<String> conditionList =new ArrayList<String>();
        if(currentLoginState.getLoginUser().getIsAdmin() && StringTools.equals(AppConfig.getAdminAccount(), currentLoginState.getLoginUser().getSysUserAccount())){
            conditionList.add("1=1");
        }else{
            DataAuthService service = SpringContextUtil.getBean("dataAuthService");
            ResultView resultView = service.getUserDataAuthList(currentLoginState.getSysUserCode(), dbType);
            
            List<DataAuth> dataAuthList = (List<DataAuth>) resultView.getData("dataAuthList");
            
            /*if(CollectionTools.isNotEmpty(dataAuthList)){
                for (DataAuth dataAuth : dataAuthList) {
                    conditionList.add(colName+" = '"+dataAuth.getAuthCode()+"'");
                }
            }*/
            
            if(CollectionTools.isEmpty(conditionList)){
                conditionList.add("1=0");
            }
        }
        return " (" +StringTools.listToString(conditionList, " or ")+") ";
    }
    @Override
    public ResultView getDataAuthListByUser(String sysRoleCode) {
    	ResultView result = new ResultView();
    	Integer integer = dataAuthDao.getDataAuthListByUser(sysRoleCode);
    	result.putData("auth", integer);
    	return result;
    }
    
    @Override
    public ResultView getDataAuthListByFile(String sysRoleCode) {
    	ResultView result = new ResultView();
    	Integer integer = dataAuthDao.getDataAuthListByFile(sysRoleCode);
    	result.putData("auth", integer);
    	return result;
    }
    
}
