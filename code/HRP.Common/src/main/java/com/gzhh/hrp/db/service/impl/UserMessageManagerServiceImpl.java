package com.gzhh.hrp.db.service.impl;


import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.db.dao.UserMessageManagerDao;
import com.gzhh.hrp.db.entity.User;
import com.gzhh.hrp.db.service.UserMessageManagerService;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cenmingzhong
 * @create 2020-10-07-下午 16:52
 */
@Service
public class UserMessageManagerServiceImpl extends BaseService implements UserMessageManagerService {

    @Autowired
    private UserMessageManagerDao userMessageManagerDao;

    @Override
    public ResultView getInfo(Integer teacherNumber) {
        ResultView resultView = new ResultView();
        User user = userMessageManagerDao.get(teacherNumber);
        resultView.putData("user", user);
        return resultView;
    }

    /**
     * 删除用户
     * @param teacherNumbers
     */
    @Override
    public void deleteUser(List<Integer> teacherNumbers) {
        for(Integer teacherNumber : teacherNumbers){
            User user = userMessageManagerDao.get(teacherNumber);
            userMessageManagerDao.delete(user);
        }
    }

    /**
     * 保存用户
     * @param user
     */
    @Override
    public void save(User user) {
        if (user.getIsNew()){
            add(user);
        }else{
            update(user);
        }
    }

    /**
     * 更新用户
     * @param user
     */
    private void update(User user) {
        userMessageManagerDao.update(user); //在数据库中更新数据
    }

    /**
     * 添加用户
     * @param user
     */
    private void add(User user) {
        if(userMessageManagerDao.get(user.getTeacherNumber())!=null){
            throw new ValidateException(String.format("人员编码%s已存在，保存失败",user.getTeacherNumber()));
        }

        userMessageManagerDao.insert(user);//在数据库中插入数据
    }

    /**
     * 得到用户列表
     * @param params
     * @return
     */
    public ResultView getList(HashMap<String, Object> params) {
        ResultView resultView = new ResultView();
        List<Map> userList= userMessageManagerDao.getUserList(params);

        resultView.putData("userList",userList);
        return resultView;
    }

    /**
     * 修改用户权限
     */
    @Override
    public void userGroupSetting() {

    }

    @Override
    public void addUser(Integer userNumber) {

    }



    @Override
    public void updateUser(Integer userNumber) {

    }

    @Override
    public User queryUser(Integer userNumber) {
        return null;
    }

    @Override
    public void updateUserPassword(Integer userNumber, String password) {

    }
}
