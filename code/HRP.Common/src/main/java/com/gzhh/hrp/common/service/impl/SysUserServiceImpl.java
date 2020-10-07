package com.gzhh.hrp.common.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.dao.SysRoleDao;
import com.gzhh.hrp.common.dao.SysUserDao;
import com.gzhh.hrp.common.dao.SysUserPersonDao;
import com.gzhh.hrp.common.dao.SysUserProjDao;
import com.gzhh.hrp.common.dao.SysUserRoleDao;
import com.gzhh.hrp.common.entity.SysUser;
import com.gzhh.hrp.common.entity.SysUserProj;
import com.gzhh.hrp.common.entity.SysUserRole;
import com.gzhh.hrp.common.service.DataAuthService;
import com.gzhh.hrp.common.service.SysUserService;
import com.gzhh.hrp.tools.CollectionTools;
import com.gzhh.hrp.tools.CommonTools;
import com.gzhh.hrp.tools.MD5Util;
import com.gzhh.hrp.tools.ResultView;
import com.gzhh.hrp.tools.StringTools;

@Service("sysUserService")
public class SysUserServiceImpl extends BaseService implements SysUserService{
    
    @Resource
    private SysUserDao sysUserDao;
    @Resource
    private SysUserProjDao sysUserProjDao;
    @Resource
    private SysUserPersonDao sysUserPersonDao;
    @Resource
    private SysRoleDao sysRoleDao;
    @Resource
    private SysUserRoleDao sysUserRoleDao;
    @Resource
    private DataAuthService dataAuthService;
    
    @Transactional
    public void save(SysUser user) {
        if(user.getSysUserCode()==null || user.getSysUserCode().length() <= 0){
            add(user);
        }
        else{
            update(user);
        }
           
    }
    public void add(SysUser user){
        user.setSysUserCode(getNewId());
        if(user.getSysUserCode() == null || user.getSysUserCode().length() <= 0)
        {
            throw new ValidateException("用户编码不能为空");
        }
        //编码不能重复
        else if (sysUserDao.get(user.getSysUserCode()) != null)
        {
            throw new ValidateException("用户编码："+user.getSysUserCode()+"不能重复");
        }
        else if (StringTools.isEmpty(user.getSysUserAccount()))
        {
            throw new ValidateException("登录账号不能为空");
        }
        else if (sysUserDao.getUserByLoginAccount(user.getSysUserAccount()) != null)
        {
            throw new ValidateException("登陆账号不能重复");
        }
        user.setSysUserPassword(MD5Util.MD5Encode(user.getSysUserPassword(),"UTF-8"));//默认密码
        user.setCreateTime(new Date());
        if(StringTools.notEquals("admin", user.getSysUserAccount())) {
        	user.setCreator(getLoginUser().getSysUserCode());
        }
        sysUserDao.insert(user);
        //保存用户分配的项目
        List<SysUserProj> userProjList = user.getUserProjList();
        if (CollectionTools.isNotEmpty(userProjList))
        {
            for (SysUserProj sysUserProj : userProjList) {
                
                sysUserProj.setSysUserCode(user.getSysUserCode());
                sysUserProj.setId(StringTools.getGuid());
                sysUserProjDao.insert(sysUserProj);
            }
        }        
        //保存用户角色
        if(StringTools.isNotEmpty(user.getSysRoleCode())) {
        	List<SysUserRole> list = sysUserRoleDao.getListByFilter(CommonTools.newHashMap("sysUserCode", user.getSysUserCode()));
        	sysUserRoleDao.batchDelete(list);
        	SysUserRole sysUserRole = new SysUserRole();
        	sysUserRole.setId(getNewId());
        	sysUserRole.setSysRoleCode(user.getSysRoleCode().toString());
        	sysUserRole.setSysUserCode(user.getSysUserCode());
        	sysUserRoleDao.insert(sysUserRole);
        }
       
    }
    public void update(SysUser user){
        
        if (StringTools.isEmpty(user.getSysUserAccount())){
            throw new ValidateException("登录账号不能为空");
        }
        SysUser existUser = sysUserDao.getUserByLoginAccount(user.getSysUserAccount());
        if (existUser != null && !StringTools.equals(user.getSysUserCode(), existUser.getSysUserCode())){
            throw new ValidateException("登陆账号不能重复");
        }
        
        SysUser sysUser = sysUserDao.get(user.getSysUserCode());//在数据库的当前用户
        //先判断密码是否相等，如果不相等就加密
        if(!StringTools.equalsIgnoreCase(user.getSysUserPassword(), sysUser.getSysUserPassword())) {
        	String md5Encode = MD5Util.MD5Encode(user.getSysUserPassword(),"UTF-8");
        	user.setSysUserPassword(md5Encode);
        }
        user.setCreateTime(sysUser.getCreateTime());
        user.setCreator(sysUser.getCreator());
        user.setEditTime(new Date());
        user.setEditor(getLoginUser().getSysUserCode());
        sysUserDao.update(user);
        List<SysUserProj> list = sysUserProjDao.getListByFilter(CommonTools.newHashMap("sysUserCode", user.getSysUserCode()));
        if(list.size() != 0) {
              sysUserProjDao.batchDelete(list);
        }
        
        List<SysUserProj> userProjList = user.getUserProjList();
        if (CollectionTools.isNotEmpty(userProjList))
        {
            for (SysUserProj sysUserProj : userProjList) {
                
                sysUserProj.setSysUserCode(user.getSysUserCode());
                sysUserProj.setId(StringTools.getGuid());
                sysUserProjDao.insert(sysUserProj);//没更新，都是添加
            }
        } 

        //保存用户角色
        if(StringTools.isNotEmpty(user.getSysRoleCode())) {
        	List<SysUserRole> sysUserRoleList = sysUserRoleDao.getListByFilter(CommonTools.newHashMap("sysUserCode", user.getSysUserCode()));
        	sysUserRoleDao.batchDelete(sysUserRoleList);
        	SysUserRole sysUserRole = new SysUserRole();
        	sysUserRole.setId(getNewId());
        	sysUserRole.setSysRoleCode(user.getSysRoleCode().toString());
        	sysUserRole.setSysUserCode(user.getSysUserCode());
        	sysUserRoleDao.insert(sysUserRole);
        }
    }
    
    public ResultView getList(HashMap<String, Object> params){
        ResultView result = new ResultView();
        
        List<Map> userList = sysUserDao.getUserList(params);
        result.putData("userList", userList);
                
        return result;
    }
    
    public ResultView getInfo(String sysUserCode) {
        ResultView result = new ResultView();
        
        SysUser sysUser = sysUserDao.getInfo(sysUserCode);

        //List<SysUserPerson> userPersonList = sysUserPersonDao.getListByFilter(CommonTools.newHashMap("sysUserCode", sysUserCode));
        
        List<SysUserProj> userProjList = sysUserProjDao.getListByFilter(CommonTools.newHashMap("sysUserCode", sysUserCode));//获取有权限的项目
        sysUser.setUserProjList(userProjList);
        result.putData("sysUse", sysUser);
        result.putData("userProjList", userProjList);
        
        return result;
    }

    public ResultView delete(String userCode){
        ResultView result = new ResultView();
        SysUser sysUser = sysUserDao.get(userCode);
        if(sysUser==null) {
        	throw new ValidateException("该用户已删除");
        }
        //有关的表一起删除
        sysUserDao.delete(sysUser);
        return result;
    }

    /**
     * 用户登录操作
     * @param loginAccount
     * @param loginPsw
     * @return
     */
    public ResultView userLogin(String loginAccount,String loginPsw, String loginDate) {
        ResultView result = new ResultView();
        
        if (StringTools.isEmpty(loginAccount))
        {
            result.setMessage("用户名不能为空");
            result.setIsOk("N");
            return result;
        }

        if (StringTools.isEmpty(loginPsw))
        {
            result.setMessage("登陆密码不能为空");
            result.setIsOk("N");
            return result;
        }

        if (StringTools.isEmpty(loginDate))
        {
            result.setMessage("日期不能为空");
            result.setIsOk("N");
            return result;
        }

        HashMap<String, Object> filter = new HashMap<String, Object>();
        filter.put("sysUserAccount", loginAccount);
        
        List<SysUser> userList = sysUserDao.getListByFilter(filter);
        if(CollectionTools.isEmpty(userList)){

            result.setMessage("用户名不存在");
            result.setIsOk("N");
            return result;
        }else if(userList.size()>1){
            result.setMessage("用户名重复，请联系管理员");
            result.setIsOk("N");
            return result;
        }
        
        SysUser user = userList.get(0);

        if (StringTools.equals(user.getSysUserStatus(), "离职"))
        {
            result.setMessage("该用户已离职不能登录");
            result.setIsOk("N");
            return result;
        }
        if(!StringTools.equalsIgnoreCase(user.getSysUserPassword(), MD5Util.MD5Encode(loginPsw,"UTF-8"))) {
        	result.setMessage("用户名或密码不正确");
            result.setIsOk("N");
            return result;
        }
        result.setEntity(user);
        return result;
    }

    /**
     * 微信用户登录操作
     * @param loginAccount
     * @param loginPsw
     * @return
     */
  
    
    /**
     * 用户登录操作
     * @param loginAccount
     * @param loginPsw
     * @return
     */
    public ResultView singleLogin(String loginAccount) {
        ResultView result = new ResultView();
        
        HashMap<String, Object> filter = new HashMap<String, Object>();
        filter.put("sysUserAccount", loginAccount);
        
        List<SysUser> userList = sysUserDao.getListByFilter(filter);
        
        SysUser user = userList.get(0);
        result.setEntity(user);
        result.setIsOk("Y");
        result.setMessage("登陆成功");
        
        return result;
    }
    
    @Override
    public ResultView syncUser(List<Map<String, Object>> userList, String roleCode) {
        ResultView result = new ResultView();

        return result;
    }
    

    
    @Override
    public ResultView changePsw(String oldPsw, String newPsw){
        ResultView result = new ResultView();

        String userCode = getLoginUser().getSysUserCode();

        SysUser user = sysUserDao.get(userCode);
        if (user == null){
            throw new ValidateException("当前用户登录异常");
        }
        
        //
        
        if (!StringTools.equalsIgnoreCase(user.getSysUserPassword(), MD5Util.MD5Encode(oldPsw,"UTF-8"))){
            throw new ValidateException("旧密码不正确，请重新输入");
        }

        user.setSysUserPassword(MD5Util.MD5Encode(newPsw,"UTF-8"));
        sysUserDao.update(user);

        return result;
    }
    
}
