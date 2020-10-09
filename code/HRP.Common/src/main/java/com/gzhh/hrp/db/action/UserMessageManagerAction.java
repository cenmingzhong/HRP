package com.gzhh.hrp.db.action;

import com.gzhh.hrp.common.action.BaseAction;
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

    @ResponseBody
    @RequestMapping("delete")
    public ResultView delete(List<String> teacherNumbers){
        userMessageManagerService.deleteUser(teacherNumbers);
        return outSuccess("删除成功");
    }

    @ResponseBody
    @RequestMapping("getList")
    public ResultView getList(HashMap<String, Object> filter){
        return userMessageManagerService.getList(filter);
    }




    public void userMessageManager(){

    }


}
