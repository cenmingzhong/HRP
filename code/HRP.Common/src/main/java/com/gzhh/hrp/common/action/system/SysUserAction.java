package com.gzhh.hrp.common.action.system;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.common.entity.SysUser;
import com.gzhh.hrp.common.service.SysUserService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/user/")
public class SysUserAction extends BaseAction{

    @Autowired
    private SysUserService userService;
    
    @ResponseBody
    @RequestMapping("save")
    public ResultView save(SysUser sysUser) {
        userService.save(sysUser);
        return outSuccess("保存成功");
    }
    
    @ResponseBody
    @RequestMapping("getList")
    public ResultView getList(HashMap<String, Object> filters){
        ResultView result = userService.getList(filters);
        return result;
    }
    
    @ResponseBody
    @RequestMapping("getInfo")
    public ResultView getInfo(String sysUserCode) {
        return userService.getInfo(sysUserCode);
    }
    
    @ResponseBody
    @RequestMapping("delete")
    public ResultView delete(String userCode){
        userService.delete(userCode);
        return outSuccess("删除成功");
    }
    
    @RequestMapping("toUserModi")
    public String toUserModi() {
        return "/system/user/userModi";
    }
    
    @RequestMapping("toPsw")
    public String toPsw() {
        return "/system/user/changePsw";
    }
    
    @ResponseBody
    @RequestMapping("changePsw")
    public ResultView changePsw(String oldPsw, String newPsw){
        userService.changePsw(oldPsw,  newPsw);
        return outSuccess("修改成功");
    }
}
