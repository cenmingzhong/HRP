package com.gzhh.hrp.common.action.system;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.common.entity.RoleMenu;
import com.gzhh.hrp.common.service.RoleMenuService;
import com.gzhh.hrp.tools.ResultView;


@Controller
@RequestMapping("/system/roleMenu/")
public class RoleMenuAction extends BaseAction {
    @Resource
    private RoleMenuService roleMenuService;
    
    @ResponseBody
    @RequestMapping("save")
    public ResultView save(String sysRoleCode,List<RoleMenu> roleMenuList){
        roleMenuService.save(sysRoleCode,roleMenuList);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }

    @ResponseBody
    @RequestMapping("getList")
    public ResultView getList(HashMap<String, Object> filters){
        ResultView result = roleMenuService.getList(filters);
        return result;
    }

    @ResponseBody
    @RequestMapping("getInfo")
    public ResultView getInfo(String id) {
        return roleMenuService.getInfo(id);
    }

    @ResponseBody
    @RequestMapping("delete")
    public ResultView delete(String id) {
        roleMenuService.delete(id);
        return outSuccess(MessageSource.DELETE_SUCCESS);
    }
    @ResponseBody
    @RequestMapping("getRoleModuleMenuList")
    public ResultView getRoleModuleMenuList(String sysRoleCode){
        ResultView result = roleMenuService.getRoleModuleMenuList(sysRoleCode);
        return result;
    }
    
    @ResponseBody
    @RequestMapping("setRoleMenu")
    public ResultView setRoleMenu(List<String> codeList,String sysMenuCode){
        roleMenuService.setRoleMenu(codeList,sysMenuCode);
        return outSuccess("设置成功!");
    }
}