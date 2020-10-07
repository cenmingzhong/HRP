package com.gzhh.hrp.common.action;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.gzhh.hrp.common.service.MonthCloseService;
import com.gzhh.hrp.tools.ResultView;

@Controller
@RequestMapping("/system/monthClose/")
public class MonthCloseAction extends BaseAction{
    @Resource
    private MonthCloseService monthCloseService;
    
    @ResponseBody
    @RequestMapping("getMonthCloseList")
    public ResultView getMonthCloseList(String appKey){
        ResultView result = monthCloseService.getMonthCloseList(appKey);
        return result;
    }
}
