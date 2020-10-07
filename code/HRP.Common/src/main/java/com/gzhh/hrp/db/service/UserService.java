package com.gzhh.hrp.db.service;

import com.gzhh.hrp.db.entity.User;

/**
 * @author cenmingzhong
 * @create 2020-10-07-下午 16:41
 */
public interface UserService {
    public void userGroupSetting();//用户权限设置
    public void addUser(Integer userNumber);//添加用户
    public void deleteUser(Integer userNumber);//删除用户
    public void updateUser(Integer userNumber);//修改用户
    public User queryUser(Integer userNumber);//查询用户
    public void updateUserPassword(Integer userNumber,String password);//修改密码

}
