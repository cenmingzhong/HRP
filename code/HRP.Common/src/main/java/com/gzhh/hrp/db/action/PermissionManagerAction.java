package com.gzhh.hrp.db.action;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.db.entity.User;
import com.gzhh.hrp.db.service.PermissionManagerService;
import com.gzhh.hrp.tools.ResultView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cenmingzhong
 * @create 2020-10-14-下午 21:23
 */
@Controller
@RequestMapping("/db/permissionManager/")
public class PermissionManagerAction extends BaseAction {

    @Autowired
    private PermissionManagerService permissionManagerService;

    @ResponseBody
    @RequestMapping("/getList")
    public ResultView getList(HashMap<String,Object> filter){
         return permissionManagerService.getList(filter);
    }

    @ResponseBody
    @RequestMapping("/getPermissionList")
    public ResultView getPermissionList(HashMap<String,Object> filter){
        return permissionManagerService.getPermissionList(filter);
    }

    @ResponseBody
    @RequestMapping("/save")
    public ResultView save(HashMap permission){

        return permissionManagerService.save(permission);
    }

    @ResponseBody
    @RequestMapping("/getInfo")
    public ResultView getInfo(String teacherNumber){

        return permissionManagerService.getInfo(teacherNumber);
    }

}
