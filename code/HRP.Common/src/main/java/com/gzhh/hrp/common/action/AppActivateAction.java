package com.gzhh.hrp.common.action;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.service.AppActivateService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/appActivate/")
public class AppActivateAction extends BaseAction {

    @Resource
    private AppActivateService appActivateService;

    @ResponseBody
    @RequestMapping("getAppList")
    public ResultView getAppList(){
        return appActivateService.getAppList();
    }

    @ResponseBody
    @RequestMapping("activateApp")
    public ResultView activateApp(String appKey, int yearMonth){
        return appActivateService.activateApp(appKey, yearMonth);
    }

    @ResponseBody
    @RequestMapping("unActivateApp")
    public ResultView unActivateApp(String appKey){
        return appActivateService.unActivateApp(appKey);
    }
}
