package com.gzhh.hrp.db.service.impl;

import com.gzhh.hrp.common.ValidateException;
import com.gzhh.hrp.common.service.impl.BaseService;
import com.gzhh.hrp.db.dao.PasswordManagerDao;
import com.gzhh.hrp.db.entity.Password;
import com.gzhh.hrp.db.service.PasswordManagerService;
import com.gzhh.hrp.tools.MD5Util;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cenmingzhong
 * @create 2020-10-12-上午 11:31
 */
@Service("passwordManagerService")
public class PasswordManagerServiceImpl extends BaseService implements PasswordManagerService {

    @Resource
    private PasswordManagerDao passwordManagerDao;

    @Override
    public ResultView getInfo(String teacherNumber) {
        ResultView resultView = new ResultView();
        Password password = passwordManagerDao.get(teacherNumber);
        resultView.putData("password",password);
        return resultView;

    }

    @Override
    public ResultView delete(String teacherNumber) {
        ResultView resultView = new ResultView();
        Password password = passwordManagerDao.get(teacherNumber);
        if(password==null){
            throw new ValidateException("该用户已删除");
        }
        passwordManagerDao.delete(teacherNumber);
        return resultView;
    }

    @Transactional
    public void save(Password password) {
        if (password.getCreateTime()==null||password.getCreateTime().equals("")){
            add(password);
        }else{
            update(password);
        }
    }

    @Override
    public ResultView getList(HashMap<String, Object> filter) {
        ResultView resultView = new ResultView();
        List<Map> passwordList = passwordManagerDao.getPasswordList(filter);
        resultView.putData("passwordList",passwordList);
        return resultView;

    }

    private void add(Password password) {


        if(password.getTeacherNumber()==null||password.getTeacherNumber().length()<=0){
            throw new ValidateException("教师编号不能为空");
        }else if(passwordManagerDao.get(password.getTeacherNumber())!=null){
            throw new ValidateException("教师编号："+password.getTeacherNumber()+"不能重复");
        }else if(password.getTeacherName()==null||password.getTeacherName().length()<=0){
            throw new ValidateException("教师名字不能为空");
        }else if(passwordManagerDao.get(password.getTeacherName())!=null){
            throw new ValidateException("教师名字:"+ password.getTeacherName()+"不能重复");

        }else if(password.getTeacherAccount()==null||password.getTeacherAccount().length()<=0){
            throw new ValidateException("教师账号不能为空");

        }else if(passwordManagerDao.get(password.getTeacherAccount())!=null){
            throw new ValidateException("教师账户："+ password.getTeacherAccount()+"不能重复");

        }
        //password.setTeacherPassword(MD5Util.MD5Encode(password.getTeacherPassword(),"UTF-8"));
        password.setCreateTime(new Date());
        passwordManagerDao.insert(password);

    }

    private void update(Password password) {
        if(password.getTeacherNumber()==null||password.getTeacherNumber().length()<=0) {
            throw new ValidateException("教师编号不能为空");
        }else if(password.getTeacherName()==null||password.getTeacherName().length()<=0){
            throw new ValidateException("教师名字不能为空");
        }else if(password.getTeacherAccount()==null||password.getTeacherAccount().length()<=0){
            throw new ValidateException("教师账号不能为空");

        }
        password.setCreateTime(password.getCreateTime());
        passwordManagerDao.update(password);


    }
}
