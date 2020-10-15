package com.gzhh.hrp.db.action;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.db.entity.Password;
import com.gzhh.hrp.db.service.PasswordManagerService;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;

/**
 * @author cenmingzhong
 * @create 2020-10-12-上午 11:23
 */
@Controller
@RequestMapping("/db/passwordManager/")
public class PasswordManagerAction extends BaseAction {

    @Resource
    private PasswordManagerService passwordManagerService;

    @ResponseBody
    @RequestMapping("/save")
    public ResultView save(Password password){
        passwordManagerService.save(password);
        return outSuccess("保存成功");

    }

    @ResponseBody
    @RequestMapping("/getList")
    public ResultView getList(HashMap<String,Object> filter){
        ResultView result =  passwordManagerService.getList(filter);
        return result;

    }

    @ResponseBody
    @RequestMapping("/getInfo")
    public ResultView getInfo(String teacherNumber){
        ResultView result = passwordManagerService.getInfo(teacherNumber);
        return result;
    }

    @ResponseBody
    @RequestMapping("/delete")
    public ResultView delete(String teacherNumber){
        passwordManagerService.delete(teacherNumber);
        return outSuccess("删除成功");
    }

}
