package com.gzhh.hrp.db.service.impl;


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
    public void deleteUser(List<String> teacherNumbers) {

    }


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
