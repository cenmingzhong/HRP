package com.gzhh.hrp.common.action.system;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.common.entity.SysRole;
import com.gzhh.hrp.common.service.SysRoleService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/role/")
public class SysRoleAction extends BaseAction{
    
    @Autowired
    private SysRoleService sysRoleService;

    @ResponseBody
    @RequestMapping(value="save")
    public ResultView save(SysRole sysRole){ 
        sysRoleService.save(sysRole);
        return outSuccess("保存成功");
    }
    
    @ResponseBody
    @RequestMapping(value="saveAndAuth")
    public ResultView saveAndAuth(SysRole sysRole,List<Map<String, String>> idsList,List<String> dataAuthList){ 
    	sysRoleService.saveAndAuth(sysRole,idsList,dataAuthList);
    	return outSuccess("保存成功");
    }

    @ResponseBody
    @RequestMapping("getList")
    public ResultView getList(HashMap<String, Object> filter) {
        return sysRoleService.getList(filter);
    }

    @ResponseBody
    @RequestMapping("getInfo")
    public ResultView getInfo(String sysRoleCode) {
        return sysRoleService.getInfo(sysRoleCode);
    }
    
    @ResponseBody
    @RequestMapping("delete")
    public ResultView delete(String sysRoleCode){
        sysRoleService.delete(sysRoleCode);
        return outSuccess("删除成功");
    }
    
    @RequestMapping("getJurisdiction")
    public String getJurisdiction(){
        return "system/role/jurisDiction";
    }
    
}
