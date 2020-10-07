package com.gzhh.hrp.common.action.system;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.MessageSource;
import com.gzhh.hrp.common.action.BaseAction;
import com.gzhh.hrp.common.entity.SysProperty;
import com.gzhh.hrp.common.service.SysPropertyService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/property/")
public class SysPropertyAction extends BaseAction{
    
    @Autowired
    private SysPropertyService sysPropertyService;

    @ResponseBody
    @RequestMapping(value="save")
    public ResultView save(HashMap<String, Object> sysPropList, HashMap<String, Object> sysPropDetailList, String appKey)
    {
        sysPropertyService.save(sysPropList, sysPropDetailList, appKey);
        return outSuccess(MessageSource.SAVE_SUCCESS);
    }
    
    @ResponseBody
    @RequestMapping(value="getSysPropertyList")
    public ResultView getSysPropertyList(String appKey){
        ResultView result = sysPropertyService.getPropertyList(appKey);
        return result;
    }
    @ResponseBody
    @RequestMapping(value="getSysProperty")
    public ResultView getSysProperty(String appKey,String propName){
        ResultView result = new ResultView();
        SysProperty sysProperty = sysPropertyService.getSysProperty(appKey,propName);
        result.putData("sysProperty", sysProperty);
        return result;
    }
    
    @RequestMapping("toSysOptInfo")
    public String toSysOptInfo(){
        return "system/setting/sysOptionInfo";
    }
    
    @RequestMapping("toRdOptInfo")
    public String toRdOptInfo(){
        return "rd/setting/rdOptionInfo";
    }
    
    @RequestMapping("toFaOptInfo")
    public String toFaOptInfo(){
        return "fa/setting/faOptionInfo";
    }
}
