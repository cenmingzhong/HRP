package com.gzhh.hrp.db.action;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.db.entity.Person;
import com.gzhh.hrp.db.entity.User;
import com.gzhh.hrp.db.service.UserMessageManagerService;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

/**
 * @author cenmingzhong
 * @create 2020-10-08-上午 9:44
 */
@Controller
@RequestMapping("/db/userMessageManager/")
public class UserMessageManagerAction extends BaseAction {

    @Resource
    private UserMessageManagerService userMessageManagerService;

    /**
     * 删除用户
     * @param teacherNumbers
     * @return
     */
    @ResponseBody
    @RequestMapping("delete")
    public ResultView delete(List<Integer> teacherNumbers){
        userMessageManagerService.deleteUser(teacherNumbers);
        return outSuccess("删除成功");
    }

    /**
     * 得到用户列表
     * @param filter
     * @return
     */
    @ResponseBody
    @RequestMapping("getList")
    public ResultView getList(HashMap<String, Object> filter){

        return userMessageManagerService.getList(filter);
    }

    @ResponseBody
    @RequestMapping("getInfo")
    public ResultView getInfo(Integer teacherNumber){
        ResultView result = userMessageManagerService.getInfo(teacherNumber);
        return result;
    }

    /**
     * 保存用户
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("save")
    public ResultView save(User user) {
        userMessageManagerService.save(user);
        return outSuccess("保存成功");
    }




    public void userMessageManager(){

    }


}
