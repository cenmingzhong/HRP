package com.gzhh.hrp.db.service.impl;

import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.db.dao.PermissionManagerDao;
import com.gzhh.hrp.db.dao.UserMessageManagerDao;
import com.gzhh.hrp.db.entity.User;
import com.gzhh.hrp.db.service.PermissionManagerService;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author cenmingzhong
 * @create 2020-10-14-下午 21:29
 */
@Service
public class PermissionManagerServiceImpl extends BaseService implements PermissionManagerService {
    @Autowired
    private PermissionManagerDao permissionManagerDao;
    @Autowired
    private UserMessageManagerDao userMessageManagerDao;


    @Override
    public ResultView getInfo(String teacherNumber) {
        ResultView resultView = new ResultView();
        User permissionUser = userMessageManagerDao.get(teacherNumber);

        resultView.putData("permissionUser",permissionUser);
        return resultView;
    }

    @Override
    public ResultView getPermissionList(HashMap<String, Object> filter) {
        return null;
    }

    @Override
    public ResultView save(HashMap permission) {
        ResultView resultView = new ResultView();

        Set<String> set = permission.keySet();
        User userData=null;
        for(String s:set){
            if(s.equals("teacherNumber")){
                String o = (String) permission.get(s);
                userData = userMessageManagerDao.get(o);

            }
            if(s.equals("permissionNumber")){
                String o = (String) permission.get(s);
                userData.setPermissionNumber(o);
            }
        }

        userMessageManagerDao.update(userData);
        resultView.putData("permissionUser",userData);

        return resultView;




    }



    @Override
    public ResultView getList(HashMap<String, Object> filter) {
        ResultView resultView = new ResultView();
        List<Map> permissionUserList = permissionManagerDao.getPermissionUserList(filter);

        resultView.putData("permissionUserList",permissionUserList);
        return resultView;
    }
}
